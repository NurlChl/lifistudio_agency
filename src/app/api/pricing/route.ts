import { NextRequest } from "next/server";
import { Pricing } from "@/lib/models";
import { withDb, successResponse, errorResponse, paginatedResponse } from "@/lib/api-helpers";

const CATEGORY_LABEL: Record<string, string> = {
  web: "Web Development",
  uiux: "UI/UX",
  graphic: "Graphic Design",
  automation: "Automation",
};

/* GET /api/pricing — List pricing packages (public) */
export async function GET(req: NextRequest) {
  return withDb(async () => {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (category && category !== "all") filter.category = category;

    const items = await Pricing.find(filter)
      .sort({ category: 1, sortOrder: 1 })
      .lean();

    // Group by category
    const grouped: Record<string, typeof items> = {};
    for (const item of items) {
      const label = CATEGORY_LABEL[item.category] || item.category;
      if (!grouped[label]) grouped[label] = [];
      grouped[label].push(item);
    }

    return successResponse({ items, grouped });
  });
}
