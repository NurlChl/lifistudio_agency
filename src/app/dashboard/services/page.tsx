"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { getServices, createService, updateService, deleteService } from "@/lib/actions/services";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import MediaPicker from "@/components/dashboard/MediaPicker";
import { ImagePreviewModal, PreviewableImage } from "@/components/dashboard/ImagePreview";
import SearchableSelect from "@/components/ui/SearchableSelect";

export default function DashboardServices() {
  const confirm = useConfirm();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    number: "",
    title: "",
    slug: "",
    description: "",
    items: [] as string[],
    tech: [] as string[],
    image: "",
    sortOrder: 0,
    status: "draft" as "draft" | "published"
  });
  const [techInput, setTechInput] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  async function load() {
    try {
      const res = await getServices();
      setServices(res);
    } catch { toast.error("Gagal memuat services"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ number: "01", title: "", slug: "", description: "", items: [""], tech: [], image: "", sortOrder: 0, status: "draft" });
    setTechInput("");
    setShowModal(true);
  }

  function openEdit(srv: any) {
    setEditing(srv);
    setForm({
      number: srv.number,
      title: srv.title,
      slug: srv.slug,
      description: srv.description,
      items: srv.items && srv.items.length > 0 ? [...srv.items] : [""],
      tech: srv.tech && srv.tech.length > 0 ? [...srv.tech] : [],
      image: srv.image || "",
      sortOrder: srv.sortOrder,
      status: srv.status
    });
    setTechInput("");
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        items: form.items.map(i => i.trim()).filter(Boolean),
        tech: form.tech.map(t => t.trim()).filter(Boolean)
      };
      
      if (editing) {
        await updateService(editing._id, payload);
        toast.success("Service diupdate");
      } else {
        await createService(payload);
        toast.success("Service dibuat");
      }
      setShowModal(false);
      load();
    } catch (err: any) { toast.error("Gagal menyimpan (cek duplikat slug)"); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus service ini?"))) return;
    try {
      await deleteService(id);
      toast.success("Service dihapus");
      load();
    } catch { toast.error("Gagal menghapus"); }
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">Services</h1>
          <p className="text-sm text-stone-400 mt-1">Manage what you offer</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all">
          <Plus size={18} /> New Service
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">No.</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Service Name</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv) => (
                <tr key={srv._id} className="border-b border-stone-50 hover:bg-stone-50/50">
                  <td className="px-6 py-4 text-sm font-medium text-stone-400">{srv.number}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-stone-900">{srv.title}</div>
                    <div className="text-xs text-stone-500">{srv.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${srv.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>{srv.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(srv)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(srv._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {services.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No services found</p></div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">{editing ? "Edit Service" : "New Service"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Number (e.g. 01)</label>
                  <input type="text" value={form.number} onChange={e => setForm({...form, number: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Title *</label>
                  <input type="text" value={form.title} onChange={e => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                    setForm({...form, title, slug: editing ? form.slug : slug});
                  }} className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Slug *</label>
                  <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Items</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {form.items.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newItems = [...form.items];
                            newItems[index] = e.target.value;
                            setForm({ ...form, items: newItems });
                          }}
                          className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
                          placeholder={`Item #${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = form.items.filter((_, i) => i !== index);
                            setForm({ ...form, items: newItems.length > 0 ? newItems : [""] });
                          }}
                          className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-stone-200 hover:border-transparent"
                          title="Delete item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, items: [...form.items, ""] })}
                    className="mt-2 text-xs font-semibold text-accent-600 hover:text-accent-700 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Tech Stack (press Enter to add)</label>
                  <div className="flex flex-wrap gap-2 p-2 border border-stone-200 rounded-lg bg-white min-h-[120px] align-content-start focus-within:ring-2 focus-within:ring-accent-500/20 transition-all">
                    {form.tech.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-md transition-colors"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            setForm({ ...form, tech: form.tech.filter((_, i) => i !== index) });
                          }}
                          className="hover:text-red-500 focus:outline-none transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const val = techInput.trim();
                          if (val && !form.tech.includes(val)) {
                            setForm({ ...form, tech: [...form.tech, val] });
                            setTechInput("");
                          }
                        } else if (e.key === "Backspace" && !techInput && form.tech.length > 0) {
                          setForm({ ...form, tech: form.tech.slice(0, -1) });
                        }
                      }}
                      className="flex-1 min-w-[120px] bg-transparent text-sm focus:outline-none placeholder:text-stone-400 py-1"
                      placeholder={form.tech.length === 0 ? "e.g. React, Next.js" : ""}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Service Image</label>
                  <div className="flex gap-2">
                    <input type="url" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all"
                      placeholder="https://example.com/image.jpg" />
                    <button type="button" onClick={() => setShowImagePicker(true)}
                      className="px-4 py-2.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 text-sm font-medium transition-all">
                      Pick
                    </button>
                  </div>
                  {form.image && (
                    <div
                      className="mt-3 rounded-lg border border-stone-200 aspect-video overflow-hidden w-full max-w-xs cursor-zoom-in"
                      onClick={() => setPreviewImage(form.image)}
                      title="Click to preview"
                    >
                      <PreviewableImage src={form.image} alt="Service Image Preview" className="w-full h-full" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Status</label>
                  <SearchableSelect
                    options={[
                      { label: "Draft", value: "draft" },
                      { label: "Published", value: "published" }
                    ]}
                    value={form.status}
                    onChange={val => setForm({...form, status: val as "draft" | "published"})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showImagePicker && (
        <MediaPicker
          onSelect={(url) => setForm({ ...form, image: Array.isArray(url) ? url[0] : url })}
          onClose={() => setShowImagePicker(false)}
        />
      )}

      {previewImage && (
        <ImagePreviewModal src={previewImage} onClose={() => setPreviewImage(null)} />
      )}
    </div>
  );
}
