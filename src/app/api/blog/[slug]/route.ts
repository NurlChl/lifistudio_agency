import { NextRequest } from "next/server";
import { Blog } from "@/lib/models";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {
  requireApiKey,
  withDb,
  successResponse,
  errorResponse,
} from "@/lib/api-helpers";

/* GET /api/blog/[slug] — Single blog (public) */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return withDb(async () => {
    const post = await Blog.findOne({ slug }).lean();
    if (!post) return errorResponse("Blog tidak ditemukan", 404);
    return successResponse(post);
  });
}

/* PUT /api/blog/[slug] — Update blog (auth) */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authErr = requireApiKey(req);
  if (authErr) return authErr;

  const { slug } = await params;
  return withDb(async () => {
    const body = await req.json();
    const update: Record<string, unknown> = {};

    if (body.title !== undefined) {
      update.title = body.title.trim();
      update.slug = await generateUniqueSlug(body.title.trim(), slug);
    }
    if (body.content !== undefined) {
      update.content = body.content;
      update.excerpt = body.excerpt || body.content.slice(0, 160);
      update.readTime = Math.max(1, Math.ceil(body.content.split(/\s+/).length / 200));
    }
    if (body.excerpt !== undefined) update.excerpt = body.excerpt;
    if (body.category !== undefined) update.category = body.category;
    if (body.coverImage !== undefined) update.coverImage = body.coverImage;
    if (body.author !== undefined) update.author = body.author;
    if (body.tags !== undefined) update.tags = body.tags;
    if (body.status !== undefined) {
      update.status = body.status;
      if (body.status === "published") update.publishedAt = new Date();
    }

    if (Object.keys(update).length === 0) {
      return errorResponse("Tidak ada field yang diupdate");
    }

    const post = await Blog.findOneAndUpdate({ slug }, update, { new: true }).lean();
    if (!post) return errorResponse("Blog tidak ditemukan", 404);

    revalidatePath("/blog");
    revalidatePath("/dashboard/blog");
    revalidatePath(`/blog/${slug}`);

    return successResponse(post);
  });
}

/* DELETE /api/blog/[slug] — Delete blog (auth) */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authErr = requireApiKey(req);
  if (authErr) return authErr;

  const { slug } = await params;
  return withDb(async () => {
    const post = await Blog.findOneAndDelete({ slug }).lean();
    if (!post) return errorResponse("Blog tidak ditemukan", 404);

    revalidatePath("/blog");
    revalidatePath("/dashboard/blog");

    return successResponse({ deleted: true, slug });
  });
}

async function generateUniqueSlug(title: string, currentSlug?: string): Promise<string> {
  const Blog = (await import("@/lib/models")).Blog;
  const baseSlug = slugify(title);
  let finalSlug = baseSlug;
  let counter = 1;
  while (await Blog.findOne({ slug: finalSlug, _id: { $ne: null } }).where("slug").ne(currentSlug)) {
    // Just check existence properly
    const existing = await Blog.findOne({ slug: finalSlug });
    if (!existing || existing.slug === currentSlug) break;
    finalSlug = `${baseSlug}-${counter++}`;
  }
  return finalSlug;
}
