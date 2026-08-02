"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/actions/settings";
import { Info, MapPin, Globe, Loader2, Save, ImageIcon } from "lucide-react";
import MediaPicker from "@/components/dashboard/MediaPicker";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "geo" | "seo">("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pickerTarget, setPickerTarget] = useState<"logo" | "favicon" | "ogImage" | null>(null);

  const [form, setForm] = useState({
    siteName: "",
    siteDescription: "",
    logo: "",
    favicon: "",
    contactEmail: "",
    whatsappNumber: "",
    openingHours: "",
    priceRange: "",
    address: {
      streetAddress: "",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "",
    },
    geo: {
      latitude: "",
      longitude: "",
      region: "",
      placename: "",
    },
    socialLinks: {
      instagram: "",
      twitter: "",
      github: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
    },
    seo: {
      title: "",
      description: "",
      ogImage: "",
      keywords: "",
    },
  });

  async function load() {
    try {
      setLoading(true);
      const res = await getSiteSettings();
      if (res) {
        setForm({
          siteName: res.siteName || "",
          siteDescription: res.siteDescription || "",
          logo: res.logo || "",
          favicon: res.favicon || "",
          contactEmail: res.contactEmail || "",
          whatsappNumber: res.whatsappNumber || "",
          openingHours: res.openingHours || "",
          priceRange: res.priceRange || "",
          address: {
            streetAddress: res.address?.streetAddress || "",
            addressLocality: res.address?.addressLocality || "",
            addressRegion: res.address?.addressRegion || "",
            postalCode: res.address?.postalCode || "",
            addressCountry: res.address?.addressCountry || "",
          },
          geo: {
            latitude: res.geo?.latitude || "",
            longitude: res.geo?.longitude || "",
            region: res.geo?.region || "",
            placename: res.geo?.placename || "",
          },
          socialLinks: {
            instagram: res.socialLinks?.instagram || "",
            twitter: res.socialLinks?.twitter || "",
            github: res.socialLinks?.github || "",
            linkedin: res.socialLinks?.linkedin || "",
            youtube: res.socialLinks?.youtube || "",
            tiktok: res.socialLinks?.tiktok || "",
          },
          seo: {
            title: res.seo?.title || "",
            description: res.seo?.description || "",
            ogImage: res.seo?.ogImage || "",
            keywords: res.seo?.keywords || "",
          },
        });
      }
    } catch (e) {
      console.error("Failed to load settings:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateSiteSettings(form);
      setMessage({ type: "success", text: "Settings berhasil disimpan!" });
    } catch (e: any) {
      setMessage({ type: "error", text: e.message || "Gagal menyimpan settings." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-10 space-y-6">
        <div className="h-8 w-48 bg-stone-50 rounded-lg animate-pulse" />
        <div className="h-64 bg-stone-50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-stone-900">Settings</h1>
        <p className="text-sm text-stone-400 mt-1">Kelola informasi situs, alamat lokal, SEO, dan media sosial</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-stone-100 mb-8">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "general"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          <Info size={16} /> Informasi Situs
        </button>
        <button
          onClick={() => setActiveTab("geo")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "geo"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          <MapPin size={16} /> Alamat & GEO (Local SEO)
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all cursor-pointer ${
            activeTab === "seo"
              ? "border-stone-900 text-stone-900"
              : "border-transparent text-stone-400 hover:text-stone-600"
          }`}
        >
          <Globe size={16} /> SEO & Media Sosial
        </button>
      </div>

      <form onSubmit={handleSave} className="max-w-3xl">
        {activeTab === "general" && (
          <div className="bg-white rounded-xl border border-stone-100 p-8 space-y-6">
            <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">Informasi Umum</h3>
            
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nama Situs (Site Name)</label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="Lifi Studio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nomor WhatsApp (Contact & Footer)</label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="+6281234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Deskripsi Singkat Situs</label>
              <textarea
                rows={3}
                value={form.siteDescription}
                onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800 resize-none"
                placeholder="Digital Agency..."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email Kontak</label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="hello@lifistudio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Jam Kerja (Opening Hours)</label>
                <input
                  type="text"
                  value={form.openingHours}
                  onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="Sen - Sab, 08:00 - 17:00 WIB"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Rentang Harga (Price Range / Local SEO)</label>
                <input
                  type="text"
                  value={form.priceRange}
                  onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="e.g. $$, IDR, atau Rp 1.5jt - Rp 20jt"
                />
                <p className="text-[11px] text-stone-400 mt-1">Indikator harga relatif untuk Google & AI (misal: $$ atau range harga dalam IDR)</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Logo URL (PNG / SVG / WebP)</label>
                <div className="flex gap-2 items-center">
                  {form.logo ? (
                    <div className="h-10 w-10 relative flex-shrink-0 bg-stone-100 rounded-lg border border-stone-200 p-1 flex items-center justify-center overflow-hidden">
                      <img src={form.logo} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 flex-shrink-0 bg-stone-50 rounded-lg border border-dashed border-stone-200 flex items-center justify-center text-stone-400">
                      <ImageIcon size={18} />
                    </div>
                  )}
                  <input
                    type="text"
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800 min-w-0"
                    placeholder="/logo.png"
                  />
                  <button
                    type="button"
                    onClick={() => setPickerTarget("logo")}
                    className="px-3.5 py-2.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <ImageIcon size={14} /> Pilih Media
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">Logo gambar yang tampil di Navbar, Footer, dan metadata situs. Kosongkan jika ingin memakai logo teks (lifi.).</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Favicon URL (ICO / PNG / SVG)</label>
                <div className="flex gap-2 items-center">
                  {form.favicon ? (
                    <div className="h-10 w-10 relative flex-shrink-0 bg-stone-100 rounded-lg border border-stone-200 p-1 flex items-center justify-center overflow-hidden">
                      <img src={form.favicon} alt="Favicon preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 flex-shrink-0 bg-stone-50 rounded-lg border border-dashed border-stone-200 flex items-center justify-center text-stone-400">
                      <ImageIcon size={18} />
                    </div>
                  )}
                  <input
                    type="text"
                    value={form.favicon}
                    onChange={(e) => setForm({ ...form, favicon: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800 min-w-0"
                    placeholder="/favicon.ico"
                  />
                  <button
                    type="button"
                    onClick={() => setPickerTarget("favicon")}
                    className="px-3.5 py-2.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <ImageIcon size={14} /> Pilih Media
                  </button>
                </div>
                <p className="text-[11px] text-stone-400 mt-1">Ikon yang tampil di tab browser.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "geo" && (
          <div className="bg-white rounded-xl border border-stone-100 p-8 space-y-6">
            <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">Alamat Fisik & GEO Tagging</h3>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Alamat Jalan (Street Address)</label>
              <input
                type="text"
                value={form.address.streetAddress}
                onChange={(e) => setForm({ ...form, address: { ...form.address, streetAddress: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                placeholder="Jl. Gajah Mada No. 12"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Kota / Kabupaten (Locality)</label>
                <input
                  type="text"
                  value={form.address.addressLocality}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, addressLocality: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="Mojokerto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Provinsi (Region)</label>
                <input
                  type="text"
                  value={form.address.addressRegion}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, addressRegion: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="Jawa Timur"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Kode Pos (Postal Code)</label>
                <input
                  type="text"
                  value={form.address.postalCode}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, postalCode: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="61311"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Negara (Country Code)</label>
                <input
                  type="text"
                  value={form.address.addressCountry}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, addressCountry: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="ID"
                />
              </div>
            </div>

            <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3 pt-4">Koordinat & Wilayah (SEO / AI Metadata)</h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Latitude GPS</label>
                <input
                  type="text"
                  value={form.geo.latitude}
                  onChange={(e) => setForm({ ...form, geo: { ...form.geo, latitude: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="-7.4705"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Longitude GPS</label>
                <input
                  type="text"
                  value={form.geo.longitude}
                  onChange={(e) => setForm({ ...form, geo: { ...form.geo, longitude: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="112.4401"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Nama Wilayah (GEO Placename)</label>
                <input
                  type="text"
                  value={form.geo.placename}
                  onChange={(e) => setForm({ ...form, geo: { ...form.geo, placename: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="Mojokerto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Kode Region (GEO Region)</label>
                <input
                  type="text"
                  value={form.geo.region}
                  onChange={(e) => setForm({ ...form, geo: { ...form.geo, region: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="ID-JI"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="bg-white rounded-xl border border-stone-100 p-8 space-y-6">
            <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">Global SEO Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Default Meta Title</label>
              <input
                type="text"
                value={form.seo.title}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, title: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                placeholder="Lifi Studio — Premium Digital Agency"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Default Meta Description</label>
              <textarea
                rows={3}
                value={form.seo.description}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, description: e.target.value } })}
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800 resize-none"
                placeholder="Deskripsi untuk penelusuran search engine..."
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Meta Keywords (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={form.seo.keywords}
                  onChange={(e) => setForm({ ...form, seo: { ...form.seo, keywords: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="web design, agency, n8n, automation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Default Share OG Image</label>
                <div className="flex gap-2 items-center">
                  {form.seo.ogImage ? (
                    <div className="h-10 w-10 relative flex-shrink-0 bg-stone-100 rounded-lg border border-stone-200 p-1 flex items-center justify-center overflow-hidden">
                      <img src={form.seo.ogImage} alt="OG Image preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 flex-shrink-0 bg-stone-50 rounded-lg border border-dashed border-stone-200 flex items-center justify-center text-stone-400">
                      <ImageIcon size={18} />
                    </div>
                  )}
                  <input
                    type="text"
                    value={form.seo.ogImage}
                    onChange={(e) => setForm({ ...form, seo: { ...form.seo, ogImage: e.target.value } })}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800 min-w-0"
                    placeholder="/og-image.png"
                  />
                  <button
                    type="button"
                    onClick={() => setPickerTarget("ogImage")}
                    className="px-3.5 py-2.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <ImageIcon size={14} /> Pilih Media
                  </button>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-base font-semibold text-stone-900 border-b border-stone-100 pb-3 pt-4">Tautan Media Sosial</h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={form.socialLinks.instagram}
                  onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, instagram: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="https://instagram.com/lifistudio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Github URL</label>
                <input
                  type="text"
                  value={form.socialLinks.github}
                  onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, github: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="https://github.com/lifistudio"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Twitter / X URL</label>
                <input
                  type="text"
                  value={form.socialLinks.twitter}
                  onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="https://x.com/lifistudio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">LinkedIn URL</label>
                <input
                  type="text"
                  value={form.socialLinks.linkedin}
                  onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="https://linkedin.com/company/lifistudio"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">YouTube URL</label>
                <input
                  type="text"
                  value={form.socialLinks.youtube}
                  onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, youtube: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="https://youtube.com/@lifistudio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">TikTok URL</label>
                <input
                  type="text"
                  value={form.socialLinks.tiktok}
                  onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, tiktok: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20 text-stone-800"
                  placeholder="https://tiktok.com/@lifistudio"
                />
              </div>
            </div>
          </div>
        )}

        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-success/10 text-success border border-success/20"
                : "bg-error/10 text-error border border-error/20"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Menyimpan...
              </>
            ) : (
              <>
                <Save size={16} /> Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </form>

      {pickerTarget && (
        <MediaPicker
          onSelect={(url) => {
            const selectedUrl = Array.isArray(url) ? url[0] : url;
            if (pickerTarget === "logo") {
              setForm((f) => ({ ...f, logo: selectedUrl }));
            } else if (pickerTarget === "favicon") {
              setForm((f) => ({ ...f, favicon: selectedUrl }));
            } else if (pickerTarget === "ogImage") {
              setForm((f) => ({ ...f, seo: { ...f.seo, ogImage: selectedUrl } }));
            }
            setPickerTarget(null);
          }}
          onClose={() => setPickerTarget(null)}
        />
      )}
    </div>
  );
}
