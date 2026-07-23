import { NextRequest } from "next/server";
import { Blog } from "@/lib/models";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  requireApiKey,
  withDb,
  successResponse,
  createdResponse,
  errorResponse,
  paginatedResponse,
  getPagination,
} from "@/lib/api-helpers";

/* GET /api/blog — List blog (public) */
export async function GET(req: NextRequest) {
  return withDb(async () => {
    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = getPagination(searchParams);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (category && category !== "all") filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const [items, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content") // exclude full content from list
        .lean(),
      Blog.countDocuments(filter),
    ]);

    return paginatedResponse(items, total, page, limit);
  });
}

/* POST /api/blog — Create blog (auth) */
export async function POST(req: NextRequest) {
  const authErr = requireApiKey(req);
  if (authErr) return authErr;

  return withDb(async () => {
    const body = await req.json();
    const { title, content, excerpt, category, coverImage, slug, author, tags, status } = body;

    if (!title?.trim()) return errorResponse("Field 'title' wajib diisi");
    if (!content?.trim()) return errorResponse("Field 'content' wajib diisi");
    if (!category?.trim()) return errorResponse("Field 'category' wajib diisi");

    const slugToUse = slug || slugify(title);
    const existing = await Blog.findOne({ slug: slugToUse });
    const finalSlug = existing ? `${slugToUse}-${Date.now().toString(36)}` : slugToUse;

    const post = await Blog.create({
      title: title.trim(),
      content,
      excerpt: excerpt?.trim() || content.slice(0, 160),
      category: category.trim(),
      coverImage: coverImage || "",
      slug: finalSlug,
      author: author?.trim() || "Lifi Studio",
      tags: tags || [],
      status: status || "draft",
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      publishedAt: status === "published" ? new Date() : undefined,
    });

    revalidatePath("/blog");
    revalidatePath("/dashboard/blog");

    return createdResponse(post);
  });
}
