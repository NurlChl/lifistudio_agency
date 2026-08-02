"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Power, PowerOff, Key, Copy, Check, X } from "lucide-react";
import { getTokens, createToken, toggleToken, deleteToken } from "@/lib/actions/tokens";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";

export default function DashboardApiTokens() {
  const confirm = useConfirm();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [newToken, setNewToken] = useState<{ raw: string; prefix: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function load() {
    try {
      setTokens(await getTokens());
    } catch {
      toast.error("Gagal memuat API tokens");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error("Nama token wajib diisi"); return; }
    setSaving(true);
    try {
      const result = await createToken(name.trim());
      setNewToken(result);
      setShowCreate(false);
      setName("");
      load();
      toast.success("Token berhasil dibuat!");
    } catch (err: any) {
      toast.error(err.message || "Gagal membuat token");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id: string) {
    try {
      const result = await toggleToken(id);
      toast.success(result.active ? "Token diaktifkan" : "Token dinonaktifkan");
      load();
    } catch {
      toast.error("Gagal mengubah status token");
    }
  }

  async function handleDelete(id: string, tokenName: string) {
    const ok = await confirm({
      message: `Hapus token "${tokenName}"?`,
      confirmText: "Ya, Hapus",
    });
    if (!ok) return;
    try {
      await deleteToken(id);
      toast.success("Token berhasil dihapus");
      load();
    } catch {
      toast.error("Gagal menghapus token");
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Token disalin ke clipboard");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">API Tokens</h1>
          <p className="text-stone-400 text-sm mt-1">
            Kelola token akses untuk API Lifi Studio
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#c9774d] hover:bg-[#d68a5e] text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus size={18} /> Buat Token Baru
        </button>
      </div>

      {/* Create token modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowCreate(false)}>
          <div className="bg-[#1a1a23] rounded-xl p-6 w-full max-w-md mx-4 border border-white/10" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">Buat Token Baru</h2>
            <form onSubmit={handleCreate}>
              <label className="block text-sm text-stone-300 mb-1.5">Nama Token</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Contoh: Integration X Bot"
                className="w-full px-3 py-2.5 bg-[#0a0a0f] border border-white/10 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-[#c9774d] mb-4"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-stone-400 hover:text-white transition-colors text-sm">
                  Batal
                </button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[#c9774d] hover:bg-[#d68a5e] text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50">
                  {saving ? "Menyimpan..." : "Buat Token"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New token reveal modal */}
      {newToken && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setNewToken(null)}>
          <div className="bg-[#1a1a23] rounded-xl p-6 w-full max-w-lg mx-4 border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Token Berhasil Dibuat! 🎉</h2>
              <button onClick={() => setNewToken(null)} className="text-stone-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="text-stone-400 text-sm mb-4">
              Salin token ini sekarang. Token tidak akan ditampilkan lagi setelah halaman ini ditutup.
            </p>
            <div className="bg-[#0a0a0f] border border-white/10 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-stone-500">{newToken.name}</span>
                <button onClick={() => copyToClipboard(newToken.raw)} className="flex items-center gap-1 text-xs text-[#c9774d] hover:text-[#d68a5e] transition-colors">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Tersalin!" : "Salin"}
                </button>
              </div>
              <code className="text-sm text-green-400 break-all select-all font-mono">
                {newToken.raw}
              </code>
            </div>
            <button onClick={() => setNewToken(null)} className="w-full py-2 bg-[#c9774d] hover:bg-[#d68a5e] text-white rounded-lg transition-colors text-sm font-medium">
              Saya sudah menyimpannya
            </button>
          </div>
        </div>
      )}

      {/* Token list */}
      {loading ? (
        <div className="text-center py-12 text-stone-500">Memuat...</div>
      ) : tokens.length === 0 ? (
        <div className="text-center py-12 text-stone-500">
          <Key size={40} className="mx-auto mb-3 opacity-30" />
          <p>Belum ada API token. Buat token pertama kamu.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tokens.map((t) => (
            <div key={t._id} className="flex items-center justify-between bg-[#1a1a23] border border-white/5 rounded-lg px-4 py-3 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${t.active ? "bg-green-500" : "bg-stone-500"}`} />
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-stone-500 text-xs font-mono">{t.prefix}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                {t.lastUsedAt && (
                  <span className="hidden sm:inline">
                    Terakhir: {new Date(t.lastUsedAt).toLocaleDateString("id-ID")}
                  </span>
                )}
                <button
                  onClick={() => handleToggle(t._id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    t.active ? "text-green-500 hover:bg-green-500/10" : "text-stone-500 hover:bg-stone-500/10"
                  }`}
                  title={t.active ? "Nonaktifkan" : "Aktifkan"}
                >
                  {t.active ? <Power size={16} /> : <PowerOff size={16} />}
                </button>
                <button
                  onClick={() => handleDelete(t._id, t.name)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Hapus token"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
