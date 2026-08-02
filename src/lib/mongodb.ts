import mongoose from "mongoose";
import dns from "node:dns";
import { Resolver } from "node:dns/promises";

// Configure DNS resolution for Windows/Node.js environment
function configureDNS() {
  try {
    dns.setDefaultResultOrder("ipv4first");
    const current = dns.getServers();
    if (!current || current.length === 0 || current.includes("127.0.0.1") || current.includes("::1")) {
      dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"]);
    }
  } catch (e) {
    console.warn("DNS config warning:", e);
  }
}

configureDNS();

// Fallback resolver for Windows environments where Node's C-Ares fails querySrv on loopback
async function getResolvedConnectionString(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  try {
    const resolver = new Resolver();
    resolver.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1"]);

    const match = uri.match(/^mongodb\+srv:\/\/([^/]+)(\/.*)?$/);
    if (!match) return uri;

    const hostWithAuth = match[1];
    const rest = match[2] || "";

    const atIndex = hostWithAuth.indexOf("@");
    if (atIndex === -1) return uri;

    const auth = hostWithAuth.slice(0, atIndex);
    const hostname = hostWithAuth.slice(atIndex + 1);

    const srvRecords = await resolver.resolveSrv(`_mongodb._tcp.${hostname}`);
    if (!srvRecords || srvRecords.length === 0) return uri;

    const resolvedHosts = srvRecords.map((r) => `${r.name}:${r.port}`).join(",");
    const separator = rest.includes("?") ? "&" : "?";
    const directUri = `mongodb://${auth}@${resolvedHosts}${rest}${separator}ssl=true`;
    return directUri;
  } catch (err) {
    console.warn("Custom SRV resolution failed, using original URI:", err);
    return uri;
  }
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (cached.conn) return cached.conn;

  configureDNS();

  if (!cached.promise) {
    cached.promise = (async () => {
      const finalUri = await getResolvedConnectionString(MONGODB_URI);
      return mongoose.connect(finalUri, {
        bufferCommands: false,
      });
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
