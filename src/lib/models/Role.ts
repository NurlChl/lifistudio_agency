import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  slug: string;
  description?: string;
  permissions: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: [{ type: String }],
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// All available permissions in the system
export const ALL_PERMISSIONS = [
  "dashboard.view",
  "portfolio.view",
  "portfolio.create",
  "portfolio.edit",
  "portfolio.delete",
  "blog.view",
  "blog.create",
  "blog.edit",
  "blog.delete",
  "contact.view",
  "contact.edit",
  "contact.delete",
  "media.view",
  "media.upload",
  "media.delete",
  "users.view",
  "users.create",
  "users.edit",
  "users.delete",
  "roles.view",
  "roles.create",
  "roles.edit",
  "roles.delete",
  "settings.view",
  "settings.edit",
] as const;

export type Permission = (typeof ALL_PERMISSIONS)[number];

export const Role =
  mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
