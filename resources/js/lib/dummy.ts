// Data dummy sampai backend siap. Ganti dengan props dari controller.
export const cats = [['semua', 'Semua'], ['alat-camping', 'Alat camping'], ['elektronik', 'Elektronik'], ['fashion', 'Fashion'], ['akademik', 'Akademik']];
const o = (slug, name, emoji, cat, price, deposit, rating, desc) => ({ slug, name, emoji, cat, price, deposit, rating, desc, owner: 'Latuconsina' });
export const items = [
  o('canon-eos-30d', 'Canon EOS 30D', '📷', 'elektronik', 50000, 100000, 4.9, 'DSLR klasik dengan hasil foto tajam dan warna natural. Cocok untuk belajar fotografi, foto produk, dan proyek kreatif kampus.'),
  o('kalkulator-scientific', 'Kalkulator Scientific', '🧮', 'akademik', 5000, 20000, 4.8, 'Kalkulator scientific untuk ujian dan praktikum. Baterai baru, layar bersih.'),
  o('almamater-unnes', 'Almamater UNNES', '🎓', 'akademik', 20000, 50000, 4.8, 'Almamater bersih dan sudah dicuci. Tersedia ukuran S sampai XL.'),
  o('kemeja-putih-wanita', 'Kemeja Putih Wanita', '👔', 'fashion', 15000, 30000, 4.7, 'Kemeja putih polos untuk presentasi, sidang, atau wawancara.'),
  o('carrier-eiger-45l', 'Carrier Eiger 45L', '🎒', 'alat-camping', 30000, 75000, 4.9, 'Carrier 45 liter dengan rain cover. Nyaman untuk pendakian 2 sampai 3 hari.'),
  o('tenda-dome-4p', 'Tenda Dome 4 Orang', '⛺', 'alat-camping', 45000, 100000, 4.8, 'Tenda dome double layer, mudah dipasang, lengkap dengan pasak dan flysheet.'),
  o('speaker-jbl', 'Speaker JBL', '🔊', 'elektronik', 35000, 80000, 4.7, 'Speaker portable untuk acara kecil dan nobar. Baterai awet.'),
  o('trekking-pole', 'Trekking Pole', '🥾', 'alat-camping', 10000, 25000, 4.6, 'Sepasang trekking pole aluminium yang ringan dan bisa dilipat.'),
];
export const bySlug = (s) => items.find((i) => i.slug === s) ?? items[0];
export const orders = [
  { id: 'RS-1042', slug: 'carrier-eiger-45l', status: 'Sedang Disewa', start: '23 Sep', end: '26 Sep 2026', total: 90000, mitra: 'Latuconsina', lokasi: 'Kampus UNNES', bayar: 'Transfer Bank' },
  { id: 'RS-1039', slug: 'canon-eos-30d', status: 'Selesai', start: '12 Sep', end: '15 Sep 2026', total: 250000, mitra: 'Latuconsina', lokasi: 'Kampus UNNES', bayar: 'QRIS' },
  { id: 'RS-1051', slug: 'speaker-jbl', status: 'Menunggu Konfirmasi', start: '2 Okt', end: '3 Okt 2026', total: 150000, mitra: 'Latuconsina', lokasi: 'Diantar', bayar: 'QRIS' },
  { id: 'RS-1030', slug: 'trekking-pole', status: 'Dibatalkan', start: '2 Okt', end: '6 Okt 2026', total: 65000, mitra: 'Latuconsina', lokasi: 'Kampus UNNES', bayar: 'E-wallet' },
];

// --- Sisi Mitra (dummy sampai backend siap) ---
export const mitraItems = [
  { slug: 'canon-eos-30d', name: 'Canon EOS 30D', emoji: '📷', price: 50000, status: 'Aktif', disewaHariIni: true },
  { slug: 'carrier-eiger-45l', name: 'Carrier Eiger 45L', emoji: '🎒', price: 30000, status: 'Aktif', disewaHariIni: false },
  { slug: 'speaker-jbl', name: 'Speaker JBL', emoji: '🔊', price: 35000, status: 'Nonaktif', disewaHariIni: false },
];
export const mitraStats = { pendapatanBulanIni: 480000, sewaAktif: 2, barangAktif: 2, rating: 4.8 };
export const mitraRequests = [
  { id: 'RQ-201', slug: 'canon-eos-30d', penyewa: 'Bintang', start: '4 Okt', end: '6 Okt 2026', total: 150000 },
  { id: 'RQ-202', slug: 'speaker-jbl', penyewa: 'Naya', start: '5 Okt', end: '5 Okt 2026', total: 35000 },
];
export const bookedDates = { 'canon-eos-30d': ['2026-10-04', '2026-10-05', '2026-10-06', '2026-10-12', '2026-10-13'], 'carrier-eiger-45l': ['2026-10-08', '2026-10-09'] };
