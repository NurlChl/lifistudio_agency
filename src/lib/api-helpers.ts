import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "./mongodb";
import { ApiToken } from "./models/ApiToken";

/* ───────── Unified Auth ───────── */

/**
 * Validate API access — either via superadmin session or API token.
 * For route handlers: returns null if authorized, or an error response if denied.
 *
 * @param req - The NextRequest (reads x-api-key header)
 * @param options - { allowToken: true, allowSession: true }
 * @param session - The current session (from auth()), pass null if checking token only
 */
export async function requireApiAccess(
  req: NextRequest,
  session?: { user?: { role?: string } } | null,
  options?: { requireToken?: boolean; requireSuperadmin?: boolean }
): Promise<NextResponse | null> {
  const apiKey = req.headers.get("x-api-key");

  // 1. Check superadmin session
  if (!options?.requireToken && session?.user?.role === "superadmin") {
    return null; // authorized as superadmin
  }

  // 2. Check API token
  if (apiKey) {
    const hashed = crypto.createHash("sha256").update(apiKey).digest("hex");
    await connectDB();
    const token = await ApiToken.findOne({ token: hashed, active: true }).lean();

    if (token) {
      // Update lastUsedAt asynchronously (don't block on this)
      ApiToken.updateOne({ _id: token._id }, { lastUsedAt: new Date() }).catch(() => {});

      // Check if token has required permissions
      if (options?.requireSuperadmin && token.permissions[0] !== "*") {
        return errorResponse("Token ini tidak memiliki akses superadmin", 403);
      }

      return null; // authorized via token
    }
  }

  // 3. If requires session but user is not superadmin
  if (options?.requireSuperadmin) {
    return errorResponse("Akses ditolak — superadmin atau token valid diperlukan", 403);
  }

  // 4. No valid auth found
  return errorResponse(
    "Unauthorized — sertakan header x-api-key dengan token valid, atau login sebagai superadmin",
    401
  );
}

/* ───────── Token Validation for Middleware ───────── */

/**
 * Edge-compatible check — just verifies if x-api-key has correct format.
 * Actual validation (DB lookup) happens in the route handler.
 */
export function hasValidTokenFormat(req: NextRequest): boolean {
  const key = req.headers.get("x-api-key");
  return !!key && key.startsWith("lifi_");
}

/* ───────── Responses ───────── */

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function createdResponse<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function errorResponse(error: string, status = 400, detail?: string) {
  return NextResponse.json(
    { success: false, error, ...(detail ? { detail } : {}) },
    { status }
  );
}

/* ───────── Connect + Handle ───────── */

export async function withDb<T>(fn: () => Promise<T>): Promise<T> {
  await connectDB();
  return fn();
}

/* ───────── Pagination ───────── */

export function getPagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function paginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
) {
  return NextResponse.json({
    success: true,
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  });
}
