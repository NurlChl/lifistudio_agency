import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { Portfolio } from "@/lib/models";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  requireApiAccess,
  withDb,
  successResponse,
  createdResponse,
  errorResponse,
  paginatedResponse,
  getPagination,
} from "@/lib/api-helpers";

/* GET /api/portfolio — List portfolio (auth: superadmin or token) */
export async function GET(req: NextRequest) {
  const session = await auth();
  const authErr = await requireApiAccess(req, session);
  if (authErr) return authErr;

  return withDb(async () => {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPagination(searchParams);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const [items, total] = await Promise.all([
      Portfolio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Portfolio.countDocuments(filter),
    ]);

    return paginatedResponse(items, total, page, limit);
  });
}

/* POST /api/portfolio — Create portfolio (auth: superadmin or token) */
export async function POST(req: NextRequest) {
  const session = await auth();
  const authErr = await requireApiAccess(req, session);
  if (authErr) return authErr;

  return withDb(async () => {
    const body = await req.json();
    const { title, content, description, coverImage, category, techStack, hasilKlien, testimonial, status } = body;

    if (!title?.trim()) return errorResponse("Field 'title' wajib diisi");
    if (!description?.trim()) return errorResponse("Field 'description' wajib diisi");

    const slug = slugify(title);
    const existing = await Portfolio.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug;

    const item = await Portfolio.create({
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      content: content || "",
      coverImage: coverImage || "",
      category: category || "web",
      techStack: techStack || [],
      hasilKlien: hasilKlien || [],
      testimonial,
      status: status || "draft",
      publishedAt: status === "published" ? new Date() : undefined,
    });

    revalidatePath("/portfolio");
    revalidatePath("/dashboard/portfolio");

    return createdResponse(item);
  });
}
