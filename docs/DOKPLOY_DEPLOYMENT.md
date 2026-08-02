# Panduan Deployment Lifi Studio ke Dokploy via GitHub & Docker

Dokumen ini berisi panduan langkah demi langkah untuk men-deploy project **Lifi Studio** (Next.js 15+ App Router) ke server **Dokploy** menggunakan repositori **GitHub** dan **Docker**.

---

## 🛠 Prasyarat (Prerequisites)

1. **VPS Dokploy**: Server yang sudah ter-install Dokploy ([dokploy.com](https://dokploy.com)).
2. **Repositori GitHub**: Proyek `lifistudio_agency` sudah di-push ke GitHub.
3. **Database MongoDB**: MongoDB Atlas atau instance MongoDB self-hosted.
4. **Cloudinary Account**: Kredensial Cloudinary (`CLOUD_NAME`, `API_KEY`, `API_SECRET`) untuk media upload.

---

## 📁 File Konfigurasi Docker yang Disediakan

Project ini sudah dilengkapi file konfigurasi Docker yang siap pakai:
- `next.config.ts`: Menggunakan `output: "standalone"` untuk build size minimal.
- `Dockerfile`: Multi-stage build (Node 20 Alpine) yang aman dan ringan (~150-200MB).
- `.dockerignore`: Mengecualikan file lokal & dependensi dev agar build context cepat.
- `docker-compose.yml`: Opsi alternatif jika menggunakan Docker Compose stack.

---

## 🚀 Langkah-Langkah Deployment

### 1. Push Perubahan ke GitHub

Pastikan seluruh file baru (`Dockerfile`, `.dockerignore`, `docker-compose.yml`, `next.config.ts`) sudah di-commit dan di-push ke branch utama (`main`):

```bash
git add .
git commit -m "feat(deploy): setup dockerfile and dokploy configuration"
git push origin main
```

---

### 2. Menghubungkan GitHub ke Dashboard Dokploy

1. Login ke **Dashboard Dokploy** Anda (misal: `https://dokploy.yourdomain.com`).
2. Masuk ke menu **Settings** → **Providers** (atau **Integrations**).
3. Pilih **GitHub**:
   - **Metode A (GitHub App - Direkomendasikan)**: Klik *Install GitHub App*, pilih organisasi/akun GitHub Anda, dan beri akses ke repositori `lifistudio_agency`.
   - **Metode B (Personal Access Token)**: Buat PAT di GitHub dengan scope `repo` lalu masukkan token di Dokploy.

---

### 3. Membuat Application Baru di Dokploy

1. Di Dashboard Dokploy, masuk ke menu **Projects**.
2. Buat Project baru (misal: `Lifi Studio`) atau pilih project yang sudah ada.
3. Klik **Create Application**.
4. Isi konfigurasi aplikasi:
   - **Name**: `lifistudio-web`
   - **Provider**: Pilih `GitHub`
   - **Repository**: Pilih repositori GitHub Anda (contoh: `NurlChl/lifistudio_agency`).
   - **Branch**: `main`
   - **Build Type**: Pilih **Dockerfile**
   - **Dockerfile Path**: `/Dockerfile` (default)

---

### 4. Konfigurasi Environment Variables

Buka tab **Environment** pada aplikasi yang baru dibuat di Dokploy, lalu masukkan variabel berikut:

```env
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Database MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lifistudio?retryWrites=true&w=majority

# NextAuth / Auth.js
AUTH_TRUST_HOST=true
NEXTAUTH_SECRET=buat-secret-key-acak-yang-kuat-di-sini
NEXTAUTH_URL=https://lifistudio.com

# Site Info
NEXT_PUBLIC_SITE_URL=https://domain-anda.com
NEXT_PUBLIC_SITE_NAME=Lifi Studio

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# SMTP Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@domain-anda.com
```

*Catatan: Pastikan `NEXTAUTH_URL` dan `NEXT_PUBLIC_SITE_URL` disesuaikan dengan domain/subdomain produksi Anda.*

---

### 5. Setup Domain & HTTPS (Traefik)

1. Buka tab **Domains** pada halaman aplikasi Dokploy.
2. Klik **Add Domain**:
   - **Host / Domain Name**: `domain-anda.com` (atau `subdomain.domain-anda.com`).
   - **Container Port**: `3000`
   - **HTTPS / SSL**: Aktifkan (Dokploy akan secara otomatis mengurus sertifikat SSL gratis via Let's Encrypt melalui Traefik).
3. Klik **Save**.

*Jangan lupa mengarahkan A Record DNS domain Anda di Cloudflare / Registrar ke IP VPS Dokploy Anda.*

---

### 6. Deploy & Setup Auto-Deploy (Continuous Deployment)

1. Klik tombol **Deploy** di pojok kanan atas halaman aplikasi Dokploy.
2. Dokploy akan menarik kode dari GitHub, menjalankan build Docker multi-stage, dan menjalankan container.
3. **Auto Deploy (Webhook)**:
   - Di tab **General** atau **Settings** aplikasi di Dokploy, aktifkan toggle **Auto Deploy**.
   - Dokploy akan menambahkan Webhook ke repositori GitHub Anda. Setiap kali Anda melakukan `git push origin main`, Dokploy akan men-deploy versi terbaru secara otomatis tanpa downtime.

---

## 🔍 Verifikasi & Monitoring

- **Logs**: Buka tab **Logs** di Dokploy untuk melihat log aplikasi secara realtime.
- **Monitoring**: Buka tab **Monitoring** untuk melihat penggunaan CPU, RAM, dan Network container.
- **Health Check**: Akses domain Anda di browser untuk memastikan halaman website publik dan dashboard (`/dashboard`) berjalan dengan lancar.
