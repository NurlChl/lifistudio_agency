export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Lifi Studio API",
    version: "1.0.0",
    description: `API RESTful untuk konten website [Lifi Studio](https://lifistudio.vercel.app).

## Authentication

Endpoint POST, PUT, DELETE membutuhkan API key.
Kirim via header: \`x-api-key: <value>\`

## Base URL

\`https://lifistudio.vercel.app/api\`
`,
    contact: {
      name: "Lifi Studio",
      url: "https://lifistudio.vercel.app",
    },
  },
  servers: [
    { url: "https://lifistudio.vercel.app", description: "Production" },
    { url: "http://localhost:3000", description: "Development" },
  ],
  paths: {
    "/api/blog": {
      get: {
        summary: "Daftar blog",
        description: "Mendapatkan daftar blog post dengan pagination dan filter.",
        tags: ["Blog"],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
            description: "Halaman",
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 20, maximum: 50 },
            description: "Item per halaman",
          },
          {
            name: "status",
            in: "query",
            schema: { type: "string", enum: ["published", "draft"] },
            description: "Filter status",
          },
          {
            name: "category",
            in: "query",
            schema: { type: "string" },
            description: "Filter kategori (Automation, Web Development, UI/UX, Graphic Design)",
          },
          {
            name: "search",
            in: "query",
            schema: { type: "string" },
            description: "Cari berdasarkan judul",
          },
        ],
        responses: {
          "200": {
            description: "Daftar blog",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { type: "array", items: { $ref: "#/components/schemas/BlogSummary" } },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Buat blog baru",
        description: "Membuat blog post baru. Memerlukan API key.",
        tags: ["Blog"],
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateBlogInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Blog berhasil dibuat",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { $ref: "#/components/schemas/Blog" },
                  },
                },
              },
            },
          },
          "401": { description: "API key tidak valid" },
        },
      },
    },
    "/api/blog/{slug}": {
      get: {
        summary: "Detail blog",
        description: "Mendapatkan detail blog post berdasarkan slug.",
        tags: ["Blog"],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "Slug blog post",
          },
        ],
        responses: {
          "200": { description: "Detail blog" },
          "404": { description: "Blog tidak ditemukan" },
        },
      },
      put: {
        summary: "Update blog",
        description: "Mengupdate blog post. Memerlukan API key.",
        tags: ["Blog"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateBlogInput" },
            },
          },
        },
        responses: {
          "200": { description: "Blog berhasil diupdate" },
          "404": { description: "Blog tidak ditemukan" },
        },
      },
      delete: {
        summary: "Hapus blog",
        description: "Menghapus blog post. Memerlukan API key.",
        tags: ["Blog"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Blog berhasil dihapus" },
          "404": { description: "Blog tidak ditemukan" },
        },
      },
    },
    "/api/portfolio": {
      get: {
        summary: "Daftar portfolio",
        description: "Mendapatkan daftar portfolio dengan pagination.",
        tags: ["Portfolio"],
        parameters: [
          {
            name: "page",
            in: "query",
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 20 },
          },
          {
            name: "status",
            in: "query",
            schema: { type: "string", enum: ["published", "draft"] },
          },
          {
            name: "category",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Daftar portfolio",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: { type: "array", items: { $ref: "#/components/schemas/Portfolio" } },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Buat portfolio baru",
        description: "Membuat portfolio item baru. Memerlukan API key.",
        tags: ["Portfolio"],
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreatePortfolioInput" },
            },
          },
        },
        responses: {
          "201": { description: "Portfolio berhasil dibuat" },
          "401": { description: "API key tidak valid" },
        },
      },
    },
    "/api/portfolio/{slug}": {
      get: {
        summary: "Detail portfolio",
        tags: ["Portfolio"],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Detail portfolio" },
          "404": { description: "Portfolio tidak ditemukan" },
        },
      },
      put: {
        summary: "Update portfolio",
        tags: ["Portfolio"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Portfolio berhasil diupdate" },
          "404": { description: "Portfolio tidak ditemukan" },
        },
      },
      delete: {
        summary: "Hapus portfolio",
        tags: ["Portfolio"],
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Portfolio berhasil dihapus" },
          "404": { description: "Portfolio tidak ditemukan" },
        },
      },
    },
    "/api/pricing": {
      get: {
        summary: "Daftar harga",
        description: "Mendapatkan daftar paket harga layanan.",
        tags: ["Pricing"],
        parameters: [
          {
            name: "category",
            in: "query",
            schema: { type: "string", enum: ["web", "uiux", "graphic", "automation"] },
            description: "Filter kategori",
          },
        ],
        responses: {
          "200": {
            description: "Daftar harga",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    data: {
                      type: "object",
                      properties: {
                        items: { type: "array", items: { $ref: "#/components/schemas/Pricing" } },
                        grouped: { type: "object" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key",
        description: "API key untuk akses endpoint tertulis. Dapatkan dari admin Lifi Studio.",
      },
    },
    schemas: {
      Pagination: {
        type: "object",
        properties: {
          page: { type: "integer" },
          limit: { type: "integer" },
          total: { type: "integer" },
          totalPages: { type: "integer" },
          hasMore: { type: "boolean" },
        },
      },
      BlogSummary: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          excerpt: { type: "string" },
          category: { type: "string" },
          coverImage: { type: "string" },
          author: { type: "string" },
          status: { type: "string", enum: ["published", "draft"] },
          readTime: { type: "integer" },
          tags: { type: "array", items: { type: "string" } },
          publishedAt: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Blog: {
        allOf: [
          { $ref: "#/components/schemas/BlogSummary" },
          { type: "object", properties: { content: { type: "string" } } },
        ],
      },
      CreateBlogInput: {
        type: "object",
        required: ["title", "content", "category"],
        properties: {
          title: { type: "string", description: "Judul blog" },
          content: { type: "string", description: "Konten blog (HTML)" },
          excerpt: { type: "string", description: "Ringkasan (auto dari content jika kosong)" },
          category: { type: "string", description: "Kategori: Automation, Web Development, UI/UX, Graphic Design" },
          coverImage: { type: "string", description: "URL cover image" },
          slug: { type: "string", description: "URL slug (auto dari title jika kosong)" },
          author: { type: "string", default: "Lifi Studio" },
          tags: { type: "array", items: { type: "string" } },
          status: { type: "string", enum: ["published", "draft"], default: "draft" },
        },
      },
      UpdateBlogInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          excerpt: { type: "string" },
          category: { type: "string" },
          coverImage: { type: "string" },
          author: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          status: { type: "string", enum: ["published", "draft"] },
        },
      },
      Portfolio: {
        type: "object",
        properties: {
          _id: { type: "string" },
          title: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" },
          content: { type: "string" },
          coverImage: { type: "string" },
          category: { type: "string" },
          techStack: { type: "array", items: { type: "string" } },
          hasilKlien: { type: "array", items: { type: "string" } },
          testimonial: { type: "object" },
          status: { type: "string" },
          publishedAt: { type: "string" },
        },
      },
      CreatePortfolioInput: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          content: { type: "string" },
          coverImage: { type: "string" },
          category: { type: "string" },
          techStack: { type: "array", items: { type: "string" } },
          hasilKlien: { type: "array", items: { type: "string" } },
          testimonial: { type: "object" },
          status: { type: "string", enum: ["published", "draft"] },
        },
      },
      Pricing: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          tagline: { type: "string" },
          price: { type: "string" },
          unit: { type: "string" },
          description: { type: "string" },
          features: { type: "array", items: { type: "string" } },
          category: { type: "string" },
          recommended: { type: "boolean" },
          sortOrder: { type: "integer" },
        },
      },
    },
  },
  tags: [
    { name: "Blog", description: "Blog post management" },
    { name: "Portfolio", description: "Portfolio item management" },
    { name: "Pricing", description: "Pricing packages" },
  ],
};
