# Lifi Studio — Agent Instructions

## Project Overview
Lifi Studio is a premium digital agency website and CMS platform owned by **Moh Nurul Cholil (NurlChl)**.
- Web Development (WordPress, Next.js, Laravel, Vue)
- UI/UX Design
- Desain Grafis (Graphic Design)
- Automation Engineering (n8n, GHL, AI tools)

## Tech Stack (Aktual)
- **Framework:** Next.js 15+ (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 with `@theme inline` design tokens
- **Fonts:** DM Sans (`--font-heading`) + Outfit (`--font-body`) — via next/font
- **Animation:** Framer Motion (primary) — ease curve: `[0.16, 1, 0.3, 1]`
- **Database:** MongoDB via Mongoose — `lib/mongodb.ts` (cached connection)
- **Auth:** NextAuth.js / Auth.js v5 (Credentials provider, bcryptjs)
- **File Upload:** Cloudinary (`cloudinary v2`) — upload via `lib/actions/media.ts`
- **Rich Text:** TipTap (`@tiptap/react`) — StarterKit + Image + Link + YouTube + custom ButtonExtension
- **Dashboard UI:** React-hot-toast (notifications), Lucide React (icons), Framer Motion (modals/animations)
- **Structured Data:** JSON-LD via `lib/seo.ts` — Organization, LocalBusiness, Article, FAQ, BreadcrumbList
- **Icons:** Lucide React

## Design Principles
1. **Anti-AI Slop** — No glassmorphism, no generic SaaS cards, no fake dashboards, no rainbow gradients
2. **Premium Minimalism** — Inspired by only.digital: warm terracotta accent (`--color-accent-500: #d0603a`), monochromatic stone palette, generous whitespace
3. **Intentional Motion** — Framer Motion for purposeful animations clarifying state changes. Ease: `[0.16, 1, 0.3, 1]` (premium out-expo). No decorative fluff
4. **Content First** — Real copy, real metrics, no filler
5. **Human Design** — Looks crafted by a senior designer, not generated

## Design Tokens
Defined in `src/app/globals.css` under `@theme inline`:
- **Colors:** stone-50 through stone-900 (warm neutrals), accent-50 through accent-900 (terracotta), gold-400/500/600, semantic (success/warning/error/info)
- **Fonts:** `--font-heading` (DM Sans), `--font-body` (Outfit), `--font-mono` (JetBrains Mono)
- **Shadows:** sm through 2xl (based on `rgba(15, 14, 12, opacity)`)
- **Radii:** sm through 2xl
- **Typo utilities:** `.heading-1` through `.heading-3`, `.subtitle`, `.body-text` — use these instead of arbitrary font-size
- **Animations:** `.animate-fade-in-up`, `.animate-fade-in`

## Architecture — Public Pages
### Pattern: Server Component + Client Component
Setiap halaman publik (`(site)/`) dipisah jadi:
- `page.tsx` — **Server Component**: fetch data (server actions), pass ke client component
- `*-client.tsx` — **Client Component**: render UI, Framer Motion, form handling

Yang udah dipisah:
- `/about` → `about-client.tsx`
- `/contact` → `contact-client.tsx`
- `/services` → `services-client.tsx`
- `/blog` → `blog-content.tsx`
- `/portfolio` → `portfolio-content.tsx`
- `/blog/[slug]` → `blog-detail-content.tsx`
- `/(site)/` → `HomeClient.tsx`

## Architecture — Dashboard (`/dashboard/`)
### Pattern: Inline CRUD + Shared Components + Server Actions
**Layout:** `layout.tsx` (server) → `DashboardLayoutClient.tsx` (client with SessionProvider, ConfirmProvider, sidebar)
**CRUD per entity:** biasanya inline di page-nya (modal/form di page yang sama), bukan route terpisah.

**Shared Dashboard Components** (`src/components/dashboard/`):
- `BlogForm.tsx` — form create/edit blog (auto-slug, category select, cover image picker, RichTextEditor)
- `PortfolioForm.tsx` — form create/edit portfolio (auto-slug, gallery images, tech tags input, featured toggle, RichTextEditor)
- `RichTextEditor.tsx` — TipTap editor with toolbar (bold, italic, headings H1-H6, lists, blockquote, code block, image, link, YouTube embed, custom button). Integrated with MediaPicker
- `MediaPicker.tsx` — 3-tab modal: Media Library, Upload (Cloudinary), From URL. Upload queue with status indicators
- `ImagePreview.tsx` — zoom modal, hover delete overlay
- `ButtonExtension.ts` — custom TipTap extension for styled CTA buttons in blog content

**Shared UI Components** (`src/components/ui/`):
- `Counter.tsx` — animated number counter using Framer Motion useMotionValue (triggers on scroll into view)
- `Pagination.tsx` — pagination with prev/next, page numbers
- `SearchableSelect.tsx` — combobox dropdown with search, Framer Motion animation
- Button component (if exists)

**Providers** (`src/components/providers/`):
- `ConfirmProvider.tsx` — confirm dialog via context hook `useConfirm()`. Returns Promise<boolean>. Framer Motion animated modal. Variants: danger (red) / info (stone)

## Server Actions (`src/lib/actions/`)
Semua data mutation via Next.js Server Actions (`"use server"`). Setiap action me-revalidate path yang relevan.

### `src/lib/actions/index.ts`
Main actions file — Blog, Portfolio, Contact, Pricing, User CRUD + Dashboard stats + Seed pricing.
- `requireAdmin()` — reusable guard, checks auth session
- `generateUniqueSlug(Model, baseSlug, excludeId?)` — reusable slug deduplication
- Setiap fungsi: `await connectDB()`, operation, `revalidatePath()`, return `JSON.parse(JSON.stringify(result))`
- Filter + pagination pattern: `filter = {}`, optional params added, `skip/limit` with `Promise.all([find, countDocuments])`
- `getDashboardStats()`: aggregated counts via `Promise.all`
- `seedDefaultPricing()`: insertMany defaults jika Pricing masih kosong

### Separated action files (modular):
- `src/lib/actions/services.ts` — Service CRUD (+ fallback data jika DB error)
- `src/lib/actions/settings.ts` — SiteSettings CRUD (+ fallback defaults)
- `src/lib/actions/media.ts` — upload ke Cloudinary, getMedia with pagination, deleteMedia (destroy from Cloudinary + DB)
- `src/lib/actions/categories.ts` — Category CRUD per type (blog/portfolio/pricing)
- `src/lib/actions/faq.ts` — FAQ CRUD (+ auto seed 8 default FAQ jika collection kosong)
- `src/lib/actions/contact.ts` — sendContact (public endpoint, no auth needed)

### Pola Umum Actions:
```
"use server"
async function requireAdmin() { ... auth check ... }
export async function getXxx(options?)  → read (no auth needed for public)
export async function createXxx(data)   → requireAdmin()
export async function updateXxx(id, data) → requireAdmin()
export async function deleteXxx(id)     → requireAdmin()
```

## Models (`src/lib/models/`)
Mongoose models in `src/lib/models/` — exported via `index.ts`:
- `User.ts`, `Portfolio.ts`, `Blog.ts`, `Contact.ts`, `Pricing.ts`
- `Role.ts` — RBAC dengan permissions array
- `SiteSettings.ts` — single-document pattern. Fields: siteName, siteDescription, logo, favicon, socialLinks, contactEmail, whatsappNumber, address, geo, openingHours, priceRange, seo
- `Category.ts` — { name, slug, type: "blog"|"portfolio"|"pricing", sortOrder }
- `Service.ts` — { number, title, slug, description, items[], tech[], image, sortOrder, status }
- `Faq.ts` — { question, answer, category: "umum"|"harga", sortOrder }
- `Media.ts` — { url, public_id, filename, size, format }

Model pattern:
```
if (process.env.NODE_ENV === "development") {
  delete mongoose.models.ModelName;  // hot-reload guard
}
export const Model = mongoose.models.ModelName || mongoose.model(...)
```

## Dashboard Pages (`/dashboard/`)
| Route | Content |
|-------|---------|
| `/login` | Login form |
| `/` | Overview cards (stats) |
| `/blog` | Table listing → create (BlogForm) → edit (BlogForm modal/page) |
| `/blog/create` | Create blog with BlogForm |
| `/blog/edit/[id]` | Edit blog with BlogForm |
| `/portfolio` | Table listing → create/edit (PortfolioForm) |
| `/portfolio/create` | Create portfolio with PortfolioForm |
| `/portfolio/edit/[id]` | Edit portfolio with PortfolioForm |
| `/pricing` | CRUD pricing cards per category (web/uiux/graphic/automation) |
| `/services` | CRUD services (modal form, table listing). Tags input, image picker |
| `/faq` | CRUD FAQ per category (umum/harga) |
| `/categories` | CRUD categories per type (portfolio/blog/pricing) |
| `/contacts` | Read, mark read, delete contacts |
| `/media` | Grid library, upload, delete media |
| `/users` | CRUD users (admin/superadmin roles) |
| `/settings` | Site settings form (brand, contact, SEO, social, address, geo) |
| `/roles` | Role management |

## Dashboard CRUD Pattern (Inline)
```
"use client"
const confirm = useConfirm()
const [showModal, setShowModal] = useState(false)
const [editing, setEditing] = useState(null)
const [form, setForm] = useState(defaults)

async function load() {
  const res = await getXxx()
  setXxx(res)
}

async function handleSave(e) {
  // validation
  if (editing) await updateXxx(editing._id, form)
  else await createXxx(form)
  toast.success("...")
  setShowModal(false)
  load()
}

async function handleDelete(id) {
  if (!await confirm("Hapus ...?")) return
  await deleteXxx(id)
  toast.success("... dihapus")
  load()
}
```

## Navbar & Footer
- **Navbar:** `src/components/layout/Navbar.tsx` — fixed, transparent → white/backdrop-blur on scroll. Desktop + mobile with clip-path animation (Framer Motion spring). Props: `settings?` (for siteName from DB)
- **Footer:** `src/components/layout/Footer.tsx` — server component. Props: `settings?`. Dynamic social links (filters out empty/missing), address, services/company/connect groups
- Keduanya menerima `settings` dari server component parent

## SEO & Structured Data
- **Metadata:** generated dynamically in `src/app/layout.tsx` via `generateMetadata()` — reads from `getSiteSettings()`
- **JSON-LD:** injected in root layout `<head>` — `organizationSchema()` + `localBusinessSchema()` from `lib/seo.ts`
- **Sitemap:** `src/app/sitemap.ts` — dynamic, fetches all blog posts + portfolios
- **Robots:** `src/app/robots.ts`

## Development Workflow
1. Follow architecture pattern: Server Component fetch → Client Component render
2. Use design tokens from globals.css (`heading-1`, `subtitle`, `bg-stone-50`, `text-accent-500`, dll)
3. Framer Motion ease curve: `[0.16, 1, 0.3, 1]` — apply everywhere
4. Server Actions → `"use server"`, `requireAdmin()`, `revalidatePath()`, `JSON.parse(JSON.stringify())`
5. Dashboard CRUD → inline modal pattern with `useConfirm()`, `react-hot-toast`
6. Media → Cloudinary via `lib/actions/media.ts`. Use `MediaPicker` component for image selection
7. Rich text → `RichTextEditor` component (TipTap). Content is HTML string
8. Form validation di client (toast error), error catching di action (try/catch)
9. Mongoose hot-reload fix: `delete mongoose.models.ModelName` in dev
10. Mobile-first, Tailwind responsive prefixes (sm/md/lg)
11. Commit: `feat(scope): description`
