# Pramuka MIAL

Website statis materi Pramuka MI Al Irsyad Al Islamiyyah Kota Madiun.

## Struktur Folder

- `index.html` - halaman awal/beranda. Netlify akan membuka file ini otomatis.
- `pages/` - semua halaman materi dan latihan.
- `assets/` - CSS, JavaScript, dan gambar pendukung.
- `docs/` - catatan desain dan file referensi, bukan halaman utama.
- `netlify.toml` - konfigurasi deploy Netlify.

## Cara Upload ke Netlify

1. Buka Netlify.
2. Pilih deploy manual atau drag and drop.
3. Upload seluruh folder `PramukaMIAL`, bukan hanya isi `pages/`.
4. Pastikan `index.html`, `pages/`, `assets/`, dan `netlify.toml` ikut ter-upload.

Tidak ada proses build dan tidak perlu `npm install`.
