import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
  permissions: string[];
  isVerified: boolean;
  verificationToken?: string;
  emailChangeToken?: string;
  newEmail?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
    permissions: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    emailChangeToken: { type: String },
    newEmail: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    image: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
