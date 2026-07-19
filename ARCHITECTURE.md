# Lifi Studio — Architecture

## Project Structure
```
lifistudio/
├── AGENTS.md                 # AI agent instructions
├── DESIGN.md                 # Design system
├── ARCHITECTURE.md           # This file
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (fonts, metadata)
│   │   ├── page.tsx          # Home page (/)
│   │   │
│   │   ├── (site)/           # Public site layout group
│   │   │   ├── layout.tsx    # Site layout (nav + footer)
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx          # Portfolio listing
│   │   │   │   └── [slug]/page.tsx   # Portfolio detail
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── dashboard/        # Dashboard route group
│   │   │   ├── layout.tsx    # Dashboard layout (sidebar + header)
│   │   │   ├── page.tsx      # Dashboard home / stats
│   │   │   ├── login/page.tsx
│   │   │   ├── portfolio/
│   │   │   ├── blog/
│   │   │   ├── contacts/
│   │   │   └── settings/
│   │   │
│   │   └── api/              # API routes (if needed beyond server actions)
│   │       └── auth/[...nextauth]/
│   │
│   ├── components/
│   │   ├── ui/               # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Toast.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── PortfolioGrid.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── CTASection.tsx
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── portfolio/        # Portfolio-specific components
│   │   │   ├── PortfolioCard.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   └── CaseStudy.tsx
│   │   └── dashboard/        # Dashboard components
│   │       ├── StatsCard.tsx
│   │       ├── DataTable.tsx
│   │       └── FormDrawer.tsx
│   │
│   ├── lib/
│   │   ├── mongodb.ts        # MongoDB connection
│   │   ├── models/           # Mongoose models
│   │   │   ├── Portfolio.ts
│   │   │   ├── Blog.ts
│   │   │   ├── Contact.ts
│   │   │   └── User.ts
│   │   ├── actions/          # Server Actions
│   │   │   ├── portfolio.ts
│   │   │   ├── blog.ts
│   │   │   └── contact.ts
│   │   └── utils.ts          # Utility functions
│   │
│   ├── styles/
│   │   └── globals.css       # Tailwind + custom CSS variables
│   │
│   └── content/              # Static content / copy
│       ├── services.ts
│       └── site.ts
│
└── public/
    ├── images/
    ├── fonts/
    └── icons/
```

## Data Models

### Portfolio
```typescript
{
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  category: 'web' | 'uiux' | 'graphic' | 'automation';
  technologies: string[];
  images: string[];
  coverImage: string;
  liveUrl?: string;
  clientName?: string;
  projectDate: Date;
  status: 'published' | 'draft' | 'archived';
  featured?: boolean;
  testimonial?: { text: string; client: string; role?: string };
  results?: { metric: string; value: string }[];
}
```

### Blog
```typescript
{
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML from rich text editor
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt?: Date;
  status: 'published' | 'draft';
  readTime?: number; // in minutes
}
```

### Contact
```typescript
{
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  isRead: boolean;
  replied?: boolean;
  createdAt: Date;
}
```

## Data Flow
- **Public pages:** Server Components with async data fetching from MongoDB
- **Dashboard:** Client Components with Server Actions for mutations
- **Auth:** Auth.js with MongoDB adapter, credentials provider
- **File upload:** UploadThing or direct to /public via server action
- **Contact form:** Server Action → MongoDB + email notification (optional)

## Performance Targets
- Lighthouse: 95+ Performance, 100 Accessibility, 100 SEO
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.05
- Bundle size: < 200KB JS per page (code splitting by route)
