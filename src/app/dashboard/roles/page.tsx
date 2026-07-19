"use client";

import { useState } from "react";

const defaultPermissions = {
  "dashboard.view": "View Dashboard",
  "portfolio.view": "View Portfolio",
  "portfolio.create": "Create Portfolio",
  "portfolio.edit": "Edit Portfolio",
  "portfolio.delete": "Delete Portfolio",
  "blog.view": "View Blog",
  "blog.create": "Create Blog",
  "blog.edit": "Edit Blog",
  "blog.delete": "Delete Blog",
  "contact.view": "View Contacts",
  "contact.edit": "Edit Contacts",
  "contact.delete": "Delete Contacts",
  "media.view": "View Media",
  "media.upload": "Upload Media",
  "media.delete": "Delete Media",
  "users.view": "View Users",
  "users.create": "Create Users",
  "users.edit": "Edit Users",
  "users.delete": "Delete Users",
  "roles.view": "View Roles",
  "roles.edit": "Edit Roles",
  "settings.view": "View Settings",
  "settings.edit": "Edit Settings",
};

const dummyRoles = [
  {
    name: "Superadmin",
    slug: "superadmin",
    description: "Full access to all features",
    permissions: Object.keys(defaultPermissions),
  },
  {
    name: "Admin",
    slug: "admin",
    description: "Content management access",
    permissions: [
      "dashboard.view",
      "portfolio.view", "portfolio.create", "portfolio.edit",
      "blog.view", "blog.create", "blog.edit",
      "contact.view", "contact.edit",
      "media.view", "media.upload",
    ],
  },
];

export default function DashboardRoles() {
  const [selectedRole, setSelectedRole] = useState(dummyRoles[0]);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Roles & Permissions</h1>
        <p className="text-sm text-stone-400 mt-1">Define what each role can access</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Role List */}
        <div className="bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="font-heading text-sm font-semibold text-stone-900 mb-4 uppercase tracking-wider">Roles</h2>
          <div className="space-y-2">
            {dummyRoles.map((role) => (
              <button
                key={role.slug}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                  selectedRole.slug === role.slug
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                <p className="font-medium">{role.name}</p>
                <p className={`text-xs mt-0.5 ${
                  selectedRole.slug === role.slug ? "text-stone-400" : "text-stone-400"
                }`}>
                  {role.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-stone-100 p-6">
          <h2 className="font-heading text-sm font-semibold text-stone-900 mb-1 uppercase tracking-wider">
            {selectedRole.name} Permissions
          </h2>
          <p className="text-xs text-stone-400 mb-6">
            {selectedRole.permissions.length} of {Object.keys(defaultPermissions).length} permissions granted
          </p>

          <div className="space-y-1">
            {Object.entries(defaultPermissions).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedRole.permissions.includes(key)}
                  readOnly
                  className="w-4 h-4 rounded border-stone-300 text-accent-500 focus:ring-accent-500"
                />
                <div>
                  <p className="text-sm text-stone-700">{label}</p>
                  <p className="text-xs text-stone-400 font-mono">{key}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
