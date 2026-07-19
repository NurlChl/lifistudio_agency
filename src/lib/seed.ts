import { connectDB } from "./mongodb";
import { User } from "./models/User";

export async function seedSuperAdmin() {
  await connectDB();

  const existing = await User.findOne({ role: "superadmin" });
  if (existing) return;

  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await User.create({
    name: "Super Admin",
    email: "admin@lifistudio.com",
    password: hashedPassword,
    role: "superadmin",
    isVerified: true,
    permissions: [
      "dashboard.view",
      "portfolio.view", "portfolio.create", "portfolio.edit", "portfolio.delete",
      "blog.view", "blog.create", "blog.edit", "blog.delete",
      "contact.view", "contact.edit", "contact.delete",
      "media.view", "media.upload", "media.delete",
      "users.view", "users.create", "users.edit", "users.delete",
      "roles.view", "roles.create", "roles.edit", "roles.delete",
      "settings.view", "settings.edit",
    ],
  });
}
