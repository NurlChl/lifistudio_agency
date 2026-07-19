import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ role: "superadmin" });
    if (existingAdmin) {
      return Response.json(
        { message: "Superadmin already exists", email: existingAdmin.email },
        { status: 200 }
      );
    }

    const email = process.env.ADMIN_EMAIL || "admin@lifistudio.com";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await User.create({
      name: "Superadmin",
      email,
      password: hashedPassword,
      role: "superadmin",
      isActive: true,
      emailVerified: new Date(),
      permissions: [
        "dashboard.view",
        "portfolio.create",
        "portfolio.read",
        "portfolio.update",
        "portfolio.delete",
        "blog.create",
        "blog.read",
        "blog.update",
        "blog.delete",
        "contact.read",
        "contact.update",
        "media.upload",
        "media.delete",
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "roles.create",
        "roles.read",
        "roles.update",
        "roles.delete",
        "settings.read",
        "settings.update",
      ],
    });

    return Response.json(
      {
        message: "Superadmin created successfully",
        email: admin.email,
        role: admin.role,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export const runtime = "nodejs";
