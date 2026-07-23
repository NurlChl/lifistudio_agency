import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { openApiSpec } from "@/lib/openapi-spec";

/* GET /api/openapi — OpenAPI 3.1 spec (superadmin only) */
export async function GET() {
  const session = await auth();

  // Only superadmin can access the raw OpenAPI spec
  if (!session?.user || session.user.role !== "superadmin") {
    return NextResponse.json(
      { success: false, error: "Unauthorized — superadmin only" },
      { status: 401 }
    );
  }

  return NextResponse.json(openApiSpec, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
