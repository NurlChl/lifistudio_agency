import mongoose, { Schema, Document } from "mongoose";
import crypto from "crypto";

export interface IApiToken extends Document {
  name: string;
  token: string; // hashed
  prefix: string; // first 8 chars for display
  permissions: string[]; // ["*"] = all, or ["blog:read", "blog:write", "portfolio:read", ...]
  active: boolean;
  lastUsedAt?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ApiTokenSchema = new Schema<IApiToken>(
  {
    name: { type: String, required: true, trim: true },
    token: { type: String, required: true },
    prefix: { type: String, required: true },
    permissions: [{ type: String, default: ["*"] }],
    active: { type: Boolean, default: true },
    lastUsedAt: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

ApiTokenSchema.index({ token: 1 });

// Generate a raw token + store hashed version
export function generateApiToken(): { raw: string; hashed: string; prefix: string } {
  const raw = `lifi_${crypto.randomBytes(24).toString("hex")}`;
  const hashed = crypto.createHash("sha256").update(raw).digest("hex");
  const prefix = raw.slice(0, 12) + "...";
  return { raw, hashed, prefix };
}

export const ApiToken =
  mongoose.models.ApiToken || mongoose.model<IApiToken>("ApiToken", ApiTokenSchema);
