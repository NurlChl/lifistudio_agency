"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Save } from "lucide-react";

export default function DashboardSettings() {
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Settings saved successfully!");
    setSaving(false);
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Settings</h1>
        <p className="text-sm text-stone-400 mt-1">Manage site settings and account preferences</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Site Settings */}
        <section className="bg-white rounded-xl border border-stone-100 p-8">
          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-6">Site Information</h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="Lifi Studio"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  defaultValue="+6281234567890"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Site Description</label>
              <textarea
                rows={3}
                defaultValue="Web Development, UI/UX Design, Graphic Design, dan Automation Engineering — satu studio, semua solusi digital."
                className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Contact Email</label>
                <input
                  type="email"
                  defaultValue="hello@lifistudio.com"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">SEO Title</label>
                <input
                  type="text"
                  defaultValue="Lifi Studio — Digital Agency"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50 transition-all"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </section>

        {/* Account Settings */}
        <section className="bg-white rounded-xl border border-stone-100 p-8">
          <h2 className="font-heading text-lg font-semibold text-stone-900 mb-6">Account Settings</h2>
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">New Email</label>
                <input
                  type="email"
                  placeholder="newemail@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>

            {/* SMTP Settings */}
            <div className="pt-6 border-t border-stone-100">
              <h3 className="font-heading text-base font-semibold text-stone-900 mb-4">SMTP Configuration</h3>
              <p className="text-xs text-stone-400 mb-4">
                Used for email verification, password reset, and notifications.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">SMTP Host</label>
                  <input
                    type="text"
                    placeholder="smtp.gmail.com"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">SMTP Port</label>
                  <input
                    type="text"
                    placeholder="587"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">SMTP Email</label>
                  <input
                    type="email"
                    placeholder="noreply@lifistudio.com"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">SMTP Password</label>
                  <input
                    type="password"
                    placeholder="App password"
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50 transition-all"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Update Account"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
