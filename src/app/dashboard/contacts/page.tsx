"use client";

import { useEffect, useState } from "react";
import { MailOpen, Trash2, Eye, X } from "lucide-react";
import { getContacts, markContactRead, deleteContact } from "@/lib/actions";
import { toast } from "react-hot-toast";
import { useConfirm } from "@/components/providers/ConfirmProvider";

export default function DashboardContacts() {
  const confirm = useConfirm();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  async function load() {
    try {
      const res = await getContacts();
      setContacts(res.items);
    } catch { toast.error("Gagal memuat kontak"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleMarkRead(id: string) {
    try {
      await markContactRead(id);
      toast.success("Ditandai sudah dibaca");
      load();
    } catch { toast.error("Gagal update"); }
  }

  async function handleDelete(id: string) {
    if (!(await confirm("Hapus pesan ini?"))) return;
    try {
      await deleteContact(id);
      toast.success("Pesan berhasil dihapus");
      if (selected?._id === id) setSelected(null);
      load();
    } catch { toast.error("Gagal menghapus"); }
  }

  const unreadCount = contacts.filter((c) => !c.isRead).length;

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">
          Contacts {unreadCount > 0 && <span className="text-sm font-normal text-accent-500 ml-2">({unreadCount} unread)</span>}
        </h1>
        <p className="text-sm text-stone-400 mt-1">Messages from the contact form</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-stone-50 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Name</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Service</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-stone-400 uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className={`border-b border-stone-50 hover:bg-stone-50/50 transition-colors ${!contact.isRead ? "bg-accent-50/20" : ""}`}>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-stone-900">{contact.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-400">{contact.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">{contact.service || "—"}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-400">{new Date(contact.createdAt).toLocaleDateString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${contact.isRead ? "bg-stone-50 text-stone-400" : "bg-accent-50 text-accent-600"}`}>
                      {contact.isRead ? "Read" : "New"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelected(contact)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="View">
                        <Eye size={16} />
                      </button>
                      {!contact.isRead && (
                        <button onClick={() => handleMarkRead(contact._id)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400 transition-all" title="Mark read">
                          <MailOpen size={16} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(contact._id)} className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {contacts.length === 0 && <div className="text-center py-16"><p className="text-sm text-stone-400">No messages yet</p></div>}
        </div>
      )}

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-20 pb-10 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-stone-900">Message Detail</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-stone-100 text-stone-400"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-stone-400">Name</span><p className="font-medium text-stone-900">{selected.name}</p></div>
                <div><span className="text-stone-400">Email</span><p className="font-medium text-stone-900">{selected.email}</p></div>
                {selected.phone && <div><span className="text-stone-400">Phone</span><p className="font-medium text-stone-900">{selected.phone}</p></div>}
                {selected.company && <div><span className="text-stone-400">Company</span><p className="font-medium text-stone-900">{selected.company}</p></div>}
                {selected.service && <div><span className="text-stone-400">Service</span><p className="font-medium text-stone-900">{selected.service}</p></div>}
                {selected.budget && <div><span className="text-stone-400">Budget</span><p className="font-medium text-stone-900">{selected.budget}</p></div>}
              </div>
              <div className="pt-4 border-t border-stone-100">
                <span className="text-sm text-stone-400">Message</span>
                <p className="text-sm text-stone-900 mt-2 whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                {!selected.isRead && (
                  <button onClick={() => { handleMarkRead(selected._id); setSelected({...selected, isRead: true}); }}
                    className="px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-all">Mark as Read</button>
                )}
                <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-all">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
