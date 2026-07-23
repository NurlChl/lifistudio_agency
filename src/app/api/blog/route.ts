import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/lib/models";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

function checkApiKey(req: NextRequest) {
  const key = req.headers.get("x-api-key");
  if (!key || key !== process.env.CONTENT_API_KEY) {
    return false;
  }
  return true;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (category && category !== "all") filter.category = category;

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Blog.countDocuments(filter),
    ]);

    return NextResponse.json({
      items: JSON.parse(JSON.stringify(items)),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil blog", detail: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!checkApiKey(req)) {
    return NextResponse.json({ error: "API key tidak valid" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, excerpt, category, coverImage, slug, author, status } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Field wajib: title, content, category" },
        { status: 400 }
      );
    }

    await connectDB();

    const slugToUse = slug || slugify(title);

    // Generate unique slug
    const existing = await Blog.findOne({ slug: slugToUse });
    const finalSlug = existing
      ? `${slugToUse}-${Date.now().toString(36)}`
      : slugToUse;

    const post = await Blog.create({
      title,
      content,
      excerpt: excerpt || content.slice(0, 160),
      category,
      coverImage: coverImage || "",
      slug: finalSlug,
      author: author || "Lifi Studio",
      status: status || "draft",
      readTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      publishedAt: status === "published" ? new Date() : undefined,
    });

    revalidatePath("/blog");
    revalidatePath("/dashboard/blog");

    return NextResponse.json(
      { message: "Blog berhasil dibuat", data: JSON.parse(JSON.stringify(post)) },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal membuat blog", detail: (error as Error).message },
      { status: 500 }
    );
  }
}
