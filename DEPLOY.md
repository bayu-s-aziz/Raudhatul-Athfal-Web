# Panduan Deploy Website RA Al-Islam

## Informasi Website
- **Nama:** Raudhatul Athfal Al-Islam
- **Lokasi:** Dusun Sirnagalih, RT 38, RW 18, Desa Gunungcupu, Kecamatan Sindangkasih, Kabupaten Ciamis, Jawa Barat 46268
- **Telepon:** 081312801425
- **Email:** alislam.gncupu@gmail.com
- **NSS / NPSN:** 101232070043 / 69736386

## Persiapan Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Static Site
```bash
npm run build
```

File hasil build akan berada di folder `dist/`

## Upload ke Hosting

### File yang Harus Di-upload
Upload **seluruh isi** folder `dist/` ke folder `public_html` di hosting Anda:

```
dist/
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── images/
├── .htaccess        ← Penting untuk routing SPA
└── contact.php      ← Handler form kontak
```

### Penting!
- ✅ Pastikan file `.htaccess` ikut ter-upload (penting untuk routing)
- ✅ Pastikan file `contact.php` ikut ter-upload (untuk form kontak)
- ✅ Jika menggunakan subdomain/subfolder, edit `base` di `vite.config.ts`

## Konfigurasi Email

Email form kontak akan dikirim ke: **alislam.gncupu@gmail.com**

Jika ingin mengubah email tujuan:
1. Edit file `script/build-static.ts`
2. Cari baris: `$to = 'alislam.gncupu@gmail.com';`
3. Ganti dengan email yang diinginkan
4. Build ulang: `npm run build`

## Struktur Website

### Halaman Utama
- **Home** - Halaman utama dengan hero, fitur, dan preview program
- **Profil** - Visi, Misi, Tujuan, Sejarah, dan Struktur Organisasi
- **Program** - Program pendidikan yang tersedia
- **Galeri** - Foto-foto kegiatan
- **Kontak** - Form kontak dan informasi

### Fitur
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle
- ✅ SPA routing dengan Wouter
- ✅ Form kontak dengan PHP mailer
- ✅ Optimized assets (images, CSS, JS)

## Development

### Menjalankan di Local
```bash
npm run dev
```
Website akan berjalan di `http://localhost:5173`

### Preview Build
```bash
npm run build
npm run preview
```

## Troubleshooting

### Form kontak tidak berfungsi
- Pastikan server hosting support PHP
- Cek file `contact.php` sudah ter-upload
- Cek fungsi `mail()` aktif di hosting

### Page refresh menampilkan 404
- Pastikan file `.htaccess` sudah ter-upload
- Jika pakai Nginx, gunakan konfigurasi:
  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

### Gambar/Asset tidak muncul
- Cek path di `vite.config.ts`
- Pastikan semua file di folder `assets/` ikut ter-upload

## Update Konten

Untuk mengupdate konten website:

1. Edit file yang relevan:
   - **Profil:** `client/src/pages/Profil.tsx`
   - **Kontak:** `client/src/pages/Kontak.tsx`
   - **Program:** `client/src/pages/Program.tsx`

2. Build ulang:
   ```bash
   npm run build
   ```

3. Upload ulang folder `dist/` ke hosting

## Support

Untuk pertanyaan teknis, hubungi developer atau maintainer website.
