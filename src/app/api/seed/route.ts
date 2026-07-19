import { seedDefaultPricing } from "@/lib/actions";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    // Seed superadmin if not exists
    const existingAdmin = await User.findOne({ role: "superadmin" });
    if (!existingAdmin) {
      const email = process.env.ADMIN_EMAIL || "admin@lifistudio.com";
      const password = process.env.ADMIN_PASSWORD || "admin123";
      await User.create({
        name: "Superadmin",
        email,
        password: await bcrypt.hash(password, 12),
        role: "superadmin",
        isVerified: true,
        permissions: [
          "dashboard.view", "portfolio.view", "portfolio.create", "portfolio.edit", "portfolio.delete",
          "blog.view", "blog.create", "blog.edit", "blog.delete",
          "contact.view", "contact.edit", "contact.delete",
          "media.view", "media.upload", "media.delete",
          "users.view", "users.create", "users.edit", "users.delete",
          "roles.view", "roles.create", "roles.edit", "roles.delete",
          "settings.view", "settings.edit",
        ],
      });
    }

    // Seed pricing data
    const result = await seedDefaultPricing();

    return Response.json({
      message: "Seed completed",
      admin: existingAdmin ? "already exists" : "created",
      pricing: result,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export const runtime = "nodejs";
