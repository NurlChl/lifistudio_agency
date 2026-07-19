"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "@/lib/actions/faq";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";
import SearchableSelect from "@/components/ui/SearchableSelect";

export default function DashboardFaq() {
  const confirm = useConfirm();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"umum" | "harga">("umum");

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "umum" as "umum" | "harga",
    sortOrder: 0,
  });

  async function load() {
    try {
      setLoading(true);
      const res = await getFaqs();
      setFaqs(res);
    } catch {
      toast.error("Gagal memuat FAQ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({
      question: "",
      answer: "",
      category: activeTab,
      sortOrder: faqs.filter(f => f.category === activeTab).length + 1,
    });
    setShowModal(true);
  }

  function openEdit(faq: any) {
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sortOrder: faq.sortOrder || 0,
    });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question.trim()) {
      toast.error("Pertanyaan wajib diisi");
      return;
    }
    if (!form.answer.trim()) {
      toast.error("Jawaban wajib diisi");
      return;
    }

    setSaving(true);
    try {
      if (editing) {
        await updateFaq(editing._id, form);
        toast.success("FAQ berhasil diupdate");
      } else {
        await createFaq(form);
        toast.success("FAQ berhasil dibuat");
      }
      setShowModal(false);
      load();
    } catch {
      toast.error("Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus FAQ ini?"))) return;
    try {
      await deleteFaq(id);
      toast.success("FAQ berhasil dihapus");
      load();
    } catch {
      toast.error("Gagal menghapus FAQ");
    }
  }

  const filteredFaqs = faqs.filter((f) => f.category === activeTab);

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-stone-900">FAQ Management</h1>
          <p className="text-sm text-stone-400 mt-1">Kelola pertanyaan umum dan harga</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-all cursor-pointer"
        >
          <Plus size={18} /> Tambah FAQ
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-100 mb-6">
        <button
          onClick={() => setActiveTab("umum")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "umum"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Umum (Homepage)
        </button>
        <button
          onClick={() => setActiveTab("harga")}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "harga"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          Harga (Pricing)
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4 w-16">Order</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Pertanyaan & Jawaban</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4 w-28">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-sm text-stone-400">
                    Belum ada FAQ di kategori ini.
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((faq) => (
                  <tr key={faq._id} className="border-b border-stone-50 hover:bg-stone-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-stone-400">{faq.sortOrder}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-stone-900 mb-1">{faq.question}</div>
                      <div className="text-xs text-stone-500 line-clamp-2 max-w-2xl">{faq.answer}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(faq)}
                          className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 cursor-pointer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq._id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-200 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <h2 className="font-heading font-semibold text-stone-900">
                {editing ? "Edit FAQ" : "Tambah FAQ"}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Pertanyaan *</label>
                <input
                  type="text"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all text-stone-800"
                  placeholder="e.g. Apakah bisa dicicil?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Jawaban *</label>
                <textarea
                  rows={4}
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all text-stone-800 resize-none"
                  placeholder="e.g. Pembayaran dapat dilakukan 2x..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Kategori</label>
                  <SearchableSelect
                    options={[
                      { label: "Umum (Homepage)", value: "umum" },
                      { label: "Harga (Pricing)", value: "harga" },
                    ]}
                    value={form.category}
                    onChange={(val) => setForm({ ...form, category: val as any })}
                    placeholder="Pilih kategori"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Urutan (Sort Order)</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all text-stone-800"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
