"use client";

const dummyContacts = [
  { id: "1", name: "Budi Santoso", email: "budi@example.com", service: "Web Development", date: "2 days ago", isRead: false },
  { id: "2", name: "Siti Rahma", email: "siti@example.com", service: "UI/UX Design", date: "5 days ago", isRead: true },
  { id: "3", name: "Ahmad Fauzi", email: "ahmad@example.com", service: "Automation", date: "1 week ago", isRead: true },
];

export default function DashboardContacts() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Contacts</h1>
        <p className="text-sm text-stone-400 mt-1">
          Messages from the contact form — hubungi via WhatsApp untuk respon cepat
        </p>
      </div>

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
            {dummyContacts.map((contact) => (
              <tr key={contact.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-stone-900">{contact.name}</p>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">{contact.email}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 font-medium">
                    {contact.service}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-400">{contact.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    contact.isRead
                      ? "bg-stone-50 text-stone-400"
                      : "bg-accent-50 text-accent-600"
                  }`}>
                    {contact.isRead ? "Read" : "New"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`https://wa.me/6281234567890?text=Hi ${contact.name}, I received your message about ${contact.service}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    </svg>
                    Reply via WA
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
