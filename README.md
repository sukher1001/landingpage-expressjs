# Express.js Landing Page - Kuli IT Beauty

Landing page untuk Kuli IT Beauty menggunakan Express.js dengan template dari CodeIgniter.

## 🚀 Fitur

- Server-side rendering dengan EJS templates
- Semua assets dari `public/client` terintegrasi
- Widget components yang dapat digunakan kembali
- Form kontak dengan API endpoint
- Responsive design
- Security headers dengan Helmet
- Compression untuk performa optimal
- Smooth scroll navigation
- Multiple pages (Home, About, Services, Contact)

## 📁 Struktur Project

```
express-landing/
├── views/
│   ├── pages/          # Halaman utama
│   │   ├── home.ejs
│   │   ├── about.ejs
│   │   ├── services.ejs
│   │   ├── contact.ejs
│   │   ├── 404.ejs
│   │   └── error.ejs
│   └── widgets/        # Komponen reusable
│       ├── header.ejs
│       ├── footer.ejs
│       ├── hero_homepage1.ejs
│       ├── info_bar.ejs
│       ├── about_section1.ejs
│       ├── services_section1.ejs
│       ├── process_section1.ejs
│       ├── stats_section1.ejs
│       ├── team_section1.ejs
│       ├── testimonial_section1.ejs
│       ├── pricing_section1.ejs
│       ├── faq_section1.ejs
│       └── contact_section1.ejs
├── server.js           # Express server
├── package.json
└── .env               # Environment variables
```

## 🛠️ Instalasi

1. Clone repository:
```bash
git clone https://github.com/sukher1001/landingpage-expressjs.git
cd landingpage-expressjs
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

4. Jalankan server development:
```bash
npm run dev
```

5. Jalankan server production:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 🌐 Routes

- `/` - Homepage (dengan semua section)
- `/about` - Halaman Tentang Kami
- `/services` - Halaman Layanan
- `/contact` - Halaman Kontak
- `POST /api/contact` - API endpoint untuk form kontak

## 🎨 Sections di Homepage

1. **Hero Section** - Slider dengan gambar menarik
2. **Info Bar** - Jam operasional, lokasi, kontak
3. **About Section** - Tentang klinik
4. **Services Section** - Layanan yang tersedia
5. **Process Section** - 4 langkah treatment
6. **Stats Section** - Statistik/counter
7. **Team Section** - Tim profesional
8. **Testimonial Section** - Testimoni klien
9. **Pricing Section** - Paket harga
10. **FAQ Section** - Pertanyaan umum
11. **Contact Section** - Form kontak

## ⚙️ Environment Variables

```env
PORT=3000
NODE_ENV=development
```

## 📦 Assets

Semua assets (CSS, JS, images) diambil dari `../public/client` dan dapat diakses melalui `/client/*`

## 🧩 Widget Components

Widget yang tersedia:
- `header.ejs` - Navigation header (responsive untuk home/other pages)
- `footer.ejs` - Footer dengan informasi kontak
- `hero_homepage1.ejs` - Hero slider section
- `info_bar.ejs` - Info bar dengan jam operasional
- `about_section1.ejs` - About section dengan gambar
- `services_section1.ejs` - Services grid
- `process_section1.ejs` - 4 step process
- `stats_section1.ejs` - Statistics counter
- `team_section1.ejs` - Team members
- `testimonial_section1.ejs` - Testimonial section
- `pricing_section1.ejs` - Pricing plans
- `faq_section1.ejs` - FAQ accordion
- `contact_section1.ejs` - Contact form dan info

## 💻 Development

Server menggunakan nodemon untuk auto-reload saat development. Edit file `.ejs` dan server akan otomatis restart.

## 🚀 Production

Untuk production, pastikan:
1. Set `NODE_ENV=production` di `.env`
2. Gunakan process manager seperti PM2
3. Setup reverse proxy (nginx/apache)
4. Enable HTTPS

### Deploy dengan PM2

```bash
npm install -g pm2
pm2 start server.js --name "landing-page"
pm2 save
pm2 startup
```

## 🔧 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **EJS** - Template engine
- **Helmet** - Security headers
- **Compression** - Response compression
- **Nodemon** - Development auto-reload

## 📝 Notes

- Semua widget sudah dikonversi dari PHP ke EJS
- Assets path menggunakan `/client/` prefix
- Form kontak terintegrasi dengan API endpoint
- Responsive dan mobile-friendly
- Smooth scroll navigation
- Header berubah warna otomatis di halaman non-home

## 📄 License

MIT License

## 👨‍💻 Author

Rizki Putra Ramadhan - Fullstack Developer

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

Made with ❤️ by Kuli IT Beauty Team
