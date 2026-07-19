"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Shield, X } from "lucide-react";
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import SearchableSelect from "@/components/ui/SearchableSelect";

const defaultForm = { name: "", email: "", password: "", role: "admin" as "admin" | "superadmin" };

export default function DashboardUsers() {
  const confirm = useConfirm();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  async function load() {
    try { setUsers(await getUsers()); }
    catch { toast.error("Gagal memuat users"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openCreate() { setEditing(null); setForm(defaultForm); setShowModal(true); }

  function openEdit(u: any) {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) { toast.error("Nama dan email wajib diisi"); return; }
    if (!editing && !form.password) { toast.error("Password wajib diisi"); return; }
    setSaving(true);
    try {
      if (editing) {
        const payload: any = { name: form.name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await updateUser(editing._id, payload);
        toast.success("User berhasil diupdate");
      } else {
        await createUser(form);
        toast.success("User berhasil dibuat");
      }
      setShowModal(false);
      load();
    } catch { toast.error("Gagal menyimpan user"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus user ini?"))) return;
    try { await deleteUser(id); toast.success("User berhasil dihapus"); load(); }
    catch { toast.error("Gagal menghapus user"); }
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Users</h1>
          <p className="text-sm text-stone-400 mt-1">Manage dashboard users & permissions</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> Add User
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Name</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Verified</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4"><p className="text-sm font-medium text-stone-900">{user.name}</p></td>
                  <td className="px-6 py-4 text-sm text-stone-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5 w-fit ${user.role === "superadmin" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
                      <Shield size={12} /> {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium ${user.isVerified ? "text-green-500" : "text-yellow-500"}`}>
                      {user.isVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(user)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(user._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No users found</p></div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 pb-10 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">{editing ? "Edit User" : "New User"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">{editing ? "Password (kosongkan jika tidak diubah)" : "Password *"}</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" placeholder="Min 8 karakter" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Role</label>
                <SearchableSelect
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Superadmin", value: "superadmin" }
                  ]}
                  value={form.role}
                  onChange={val => setForm({...form, role: val as "admin" | "superadmin"})}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50 transition-all">
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
