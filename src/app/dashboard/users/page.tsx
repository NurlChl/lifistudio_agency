"use client";

import { Search, Edit, Trash2, Shield } from "lucide-react";

const dummyUsers = [
  { id: "1", name: "NurlChl", email: "admin@lifistudio.com", role: "superadmin", status: "active", verified: true },
  { id: "2", name: "Admin", email: "admin2@lifistudio.com", role: "admin", status: "active", verified: true },
];

export default function DashboardUsers() {
  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Users</h1>
          <p className="text-sm text-stone-400 mt-1">Manage dashboard users & permissions</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Name</th>
              <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Email</th>
              <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Role</th>
              <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Verified</th>
              <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Status</th>
              <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyUsers.map((user) => (
              <tr key={user.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-stone-900">{user.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5 w-fit ${
                    user.role === "superadmin"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-blue-50 text-blue-600"
                  }`}>
                    <Shield size={12} />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium ${
                    user.verified ? "text-green-500" : "text-yellow-500"
                  }`}>
                    {user.verified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
