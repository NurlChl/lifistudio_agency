import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "./mongodb";

/* ───────── Auth ───────── */

export function checkApiKey(req: NextRequest): boolean {
  const key = req.headers.get("x-api-key");
  return !!key && key === process.env.CONTENT_API_KEY;
}

export function requireApiKey(req: NextRequest): NextResponse | null {
  if (!checkApiKey(req)) {
    return errorResponse("API key tidak valid", 401);
  }
  return null;
}

/* ───────── Responses ───────── */

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function createdResponse<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function deletedResponse() {
  return NextResponse.json({ success: true, data: null }, { status: 200 });
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
