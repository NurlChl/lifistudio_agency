import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { Portfolio } from "@/lib/models";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  requireApiAccess,
  withDb,
  successResponse,
  errorResponse,
} from "@/lib/api-helpers";

/* GET /api/portfolio/[slug] — Single portfolio (auth: superadmin or token) */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  const authErr = await requireApiAccess(_req, session);
  if (authErr) return authErr;

  const { slug } = await params;
  return withDb(async () => {
    const item = await Portfolio.findOne({ slug }).lean();
    if (!item) return errorResponse("Portfolio tidak ditemukan", 404);
    return successResponse(item);
  });
}

/* PUT /api/portfolio/[slug] — Update portfolio (auth: superadmin or token) */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  const authErr = await requireApiAccess(req, session);
  if (authErr) return authErr;

  const { slug } = await params;
  return withDb(async () => {
    const body = await req.json();
    const update: Record<string, unknown> = {};

    const updatable = ["title", "content", "description", "coverImage", "category", "techStack", "hasilKlien", "testimonial", "status"] as const;
    for (const key of updatable) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    if (body.title) {
      update.title = body.title.trim();
      update.slug = slugify(body.title.trim());
    }
    if (body.status === "published") update.publishedAt = new Date();

    if (Object.keys(update).length === 0) {
      return errorResponse("Tidak ada field yang diupdate");
    }

    const item = await Portfolio.findOneAndUpdate({ slug }, update, { new: true }).lean();
    if (!item) return errorResponse("Portfolio tidak ditemukan", 404);

    revalidatePath("/portfolio");
    revalidatePath("/dashboard/portfolio");

    return successResponse(item);
  });
}

/* DELETE /api/portfolio/[slug] — Delete portfolio (auth: superadmin or token) */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  const authErr = await requireApiAccess(req, session);
  if (authErr) return authErr;

  const { slug } = await params;
  return withDb(async () => {
    const item = await Portfolio.findOneAndDelete({ slug }).lean();
    if (!item) return errorResponse("Portfolio tidak ditemukan", 404);
    return successResponse({ deleted: true, slug });
  });
}
