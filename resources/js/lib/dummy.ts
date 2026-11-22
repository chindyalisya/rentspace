// @ts-nocheck
// Data dummy sampai backend siap. Ganti dengan props dari controller.
// FOTO: taruh file di public/img/produk/ lalu ubah nama file di map `foto` ini kalau berbeda.
export const foto = {
    'canon-eos-30d': '/img/produk/canon-eos-30d.jpg',
    'kalkulator-scientific': '/img/produk/kalkulator-scientific.jpg',
    'almamater-unnes': '/img/produk/almamater-unnes.jpg',
    'kemeja-putih-wanita': '/img/produk/kemeja-putih-wanita.jpg',
    'kemeja-putih-pria': '/img/produk/kemeja-putih-pria.jpg',
    'celana-hitam': '/img/produk/celana-hitam.jpg',
    'rok-hitam': '/img/produk/rok-hitam.jpg',
    'sneakers-putih': '/img/produk/sneakers-putih.jpg',
    'sepatu-hitam': '/img/produk/sepatu-hitam.jpg',
    'carrier-eiger-45l': '/img/produk/carrier-eiger-45l.jpg',
    'tenda-dome-4p': '/img/produk/tenda-dome-4p.jpg',
    'trekking-pole': '/img/produk/trekking-pole.jpg',
    'sepatu-gunung': '/img/produk/sepatu-gunung.jpg',
    'sleeping-bag': '/img/produk/sleeping-bag.jpg',
    'rompi-trail': '/img/produk/rompi-trail.jpg',
    'speaker-jbl': '/img/produk/speaker-jbl.jpg',
    'stop-kontak': '/img/produk/stop-kontak.jpg',
};
export const cats = [
    ['semua', 'Semua'],
    ['alat-camping', 'Alat camping'],
    ['elektronik', 'Elektronik'],
    ['fashion', 'Fashion'],
    ['akademik', 'Akademik'],
];
// cut = foto produk berlatar putih (dibaur ke warna kartu)
const o = (
    slug,
    name,
    cat,
    price,
    deposit,
    rating,
    desc,
    owner = 'Latuconsina',
    cut = false,
) => ({
    slug,
    name,
    cat,
    price,
    deposit,
    rating,
    desc,
    owner,
    cut,
    img: foto[slug],
});
export const items = [
    o(
        'canon-eos-30d',
        'Canon EOS 30D',
        'elektronik',
        50000,
        100000,
        4.9,
        'DSLR klasik dengan hasil foto tajam dan warna natural. Cocok untuk belajar fotografi, foto produk, dan proyek kreatif kampus. Sudah termasuk lensa kit 18-55mm.',
    ),
    o(
        'kalkulator-scientific',
        'Kalkulator Scientific',
        'akademik',
        5000,
        20000,
        4.8,
        'Kalkulator scientific untuk ujian dan praktikum. Baterai baru, layar bersih, tombol semua berfungsi.',
        'Dinda',
        true,
    ),
    o(
        'almamater-unnes',
        'Almamater UNNES',
        'akademik',
        20000,
        50000,
        4.8,
        'Almamater bersih dan sudah dicuci. Tersedia ukuran S sampai XL, tinggal bilang ukuranmu saat memesan.',
        'Rafi',
    ),
    o(
        'kemeja-putih-wanita',
        'Kemeja Putih Wanita',
        'fashion',
        15000,
        30000,
        4.7,
        'Kemeja putih polos untuk presentasi, sidang, atau wawancara. Bahan adem dan tidak menerawang.',
        'Salsa',
        true,
    ),
    o(
        'kemeja-putih-pria',
        'Kemeja Putih Pria',
        'fashion',
        15000,
        30000,
        4.7,
        'Kemeja putih lengan panjang dengan saku dada. Disetrika rapi sebelum diserahkan.',
        'Rafi',
    ),
    o(
        'celana-hitam',
        'Celana Bahan Hitam',
        'fashion',
        15000,
        30000,
        4.6,
        'Celana bahan hitam potongan lurus, pas untuk sidang dan acara formal kampus.',
        'Rafi',
        true,
    ),
    o(
        'rok-hitam',
        'Rok Hitam Formal',
        'fashion',
        15000,
        30000,
        4.7,
        'Rok hitam model A yang nyaman dipakai seharian. Cocok dipadukan dengan kemeja putih.',
        'Salsa',
        true,
    ),
    o(
        'sneakers-putih',
        'Sneakers Putih',
        'fashion',
        20000,
        40000,
        4.6,
        'Sneakers putih bersih untuk acara kampus atau foto. Tersedia ukuran 38 sampai 42.',
        'Salsa',
        true,
    ),
    o(
        'sepatu-hitam',
        'Sepatu Hitam Casual',
        'fashion',
        20000,
        40000,
        4.5,
        'Sepatu hitam ringan dan empuk, aman untuk sidang maupun jalan seharian.',
        'Rafi',
        true,
    ),
    o(
        'carrier-eiger-45l',
        'Carrier 45L',
        'alat-camping',
        30000,
        75000,
        4.9,
        'Carrier 45 liter dengan rain cover. Nyaman untuk pendakian 2 sampai 3 hari, tali punggung empuk.',
        'Latuconsina',
        true,
    ),
    o(
        'tenda-dome-4p',
        'Tenda Dome 4 Orang',
        'alat-camping',
        45000,
        100000,
        4.8,
        'Tenda dome double layer, mudah dipasang, lengkap dengan pasak dan flysheet.',
        'Latuconsina',
    ),
    o(
        'trekking-pole',
        'Trekking Pole',
        'alat-camping',
        10000,
        25000,
        4.6,
        'Sepasang trekking pole aluminium yang ringan dan bisa dilipat.',
        'Latuconsina',
        true,
    ),
    o(
        'sepatu-gunung',
        'Sepatu Gunung',
        'alat-camping',
        25000,
        60000,
        4.7,
        'Sepatu hiking high-cut dengan sol anti-slip. Tersedia ukuran 39 sampai 43.',
        'Dinda',
        true,
    ),
    o(
        'sleeping-bag',
        'Sleeping Bag',
        'alat-camping',
        15000,
        40000,
        4.6,
        'Sleeping bag hangat dan ringkas, muat di tas carrier. Dicuci setiap selesai disewa.',
        'Dinda',
    ),
    o(
        'rompi-trail',
        'Rompi Trail Running',
        'alat-camping',
        15000,
        35000,
        4.5,
        'Rompi hydration dengan banyak kantong. Nyaman untuk trail run maupun hiking singkat.',
        'Dinda',
        true,
    ),
    o(
        'speaker-jbl',
        'Speaker JBL Go',
        'elektronik',
        35000,
        80000,
        4.7,
        'Speaker portable tahan air untuk acara kecil dan nobar. Baterai awet seharian.',
        'Latuconsina',
        true,
    ),
    o(
        'stop-kontak',
        'Stop Kontak 4 Lubang + USB',
        'elektronik',
        5000,
        20000,
        4.8,
        'Stop kontak kabel 3 meter dengan 2 port USB. Berguna untuk acara, lab, dan camping basecamp.',
        'Dinda',
        true,
    ),
];
export const bySlug = (s) => items.find((i) => i.slug === s) ?? items[0];
export const pick = (...slugs) => slugs.map(bySlug);
export const orders = [
    {
        id: 'RS-1042',
        slug: 'carrier-eiger-45l',
        status: 'Sedang Disewa',
        start: '23 Sep',
        end: '26 Sep 2026',
        total: 90000,
        mitra: 'Latuconsina',
        lokasi: 'Kampus UNNES',
        bayar: 'Transfer Bank',
    },
    {
        id: 'RS-1039',
        slug: 'canon-eos-30d',
        status: 'Selesai',
        start: '12 Sep',
        end: '15 Sep 2026',
        total: 250000,
        mitra: 'Latuconsina',
        lokasi: 'Kampus UNNES',
        bayar: 'QRIS',
    },
    {
        id: 'RS-1051',
        slug: 'speaker-jbl',
        status: 'Menunggu Konfirmasi',
        start: '2 Okt',
        end: '3 Okt 2026',
        total: 150000,
        mitra: 'Latuconsina',
        lokasi: 'Diantar',
        bayar: 'QRIS',
    },
    {
        id: 'RS-1030',
        slug: 'trekking-pole',
        status: 'Dibatalkan',
        start: '2 Okt',
        end: '6 Okt 2026',
        total: 65000,
        mitra: 'Latuconsina',
        lokasi: 'Kampus UNNES',
        bayar: 'E-wallet',
    },
];

// --- Sisi Mitra (dummy sampai backend siap) ---
const mi = (slug, status = 'Aktif', disewaHariIni = false) => {
    const it = bySlug(slug);
    return {
        slug,
        name: it.name,
        img: it.img,
        cut: it.cut,
        price: it.price,
        status,
        disewaHariIni,
    };
};
export const mitraItems = [
    mi('canon-eos-30d', 'Aktif', true),
    mi('carrier-eiger-45l'),
    mi('tenda-dome-4p'),
    mi('speaker-jbl', 'Nonaktif'),
];
export const mitraStats = {
    pendapatanBulanIni: 480000,
    sewaAktif: 2,
    barangAktif: 3,
    rating: 4.8,
};
export const mitraRequests = [
    {
        id: 'RQ-201',
        slug: 'canon-eos-30d',
        penyewa: 'Bintang',
        start: '4 Okt',
        end: '6 Okt 2026',
        total: 150000,
    },
    {
        id: 'RQ-202',
        slug: 'speaker-jbl',
        penyewa: 'Naya',
        start: '5 Okt',
        end: '5 Okt 2026',
        total: 35000,
    },
];
export const bookedDates = {
    'canon-eos-30d': [
        '2026-10-04',
        '2026-10-05',
        '2026-10-06',
        '2026-10-12',
        '2026-10-13',
    ],
    'carrier-eiger-45l': ['2026-10-08', '2026-10-09'],
};

/* Transaksi mitra untuk Laporan penjualan (dummy, deterministik). Ganti dengan props dari controller.
   Tanggal acuan = hari ini di aplikasi; data dibuat mundur dari tanggal ini. */
export const LAPORAN_REF = '2026-11-22';
const hariMs = 86400000;
let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const penyewaDummy = [
    'Bintang',
    'Naya',
    'Rizky',
    'Salsa',
    'Dimas',
    'Putri',
    'Fajar',
    'Alya',
    'Reza',
    'Intan',
];
const slugLaporan = [
    'canon-eos-30d',
    'carrier-eiger-45l',
    'tenda-dome-4p',
    'speaker-jbl',
];
export const laporanTransaksi = Array.from({ length: 72 }, (_, i) => {
    const lalu = Math.floor(Math.pow(rnd(), 1.3) * 170);
    const tanggal = new Date(
        new Date(LAPORAN_REF + 'T00:00:00Z').getTime() - lalu * hariMs,
    )
        .toISOString()
        .slice(0, 10);
    const slug = slugLaporan[Math.floor(rnd() * slugLaporan.length)];
    const hari = 1 + Math.floor(rnd() * 4);
    const r = rnd();
    const status =
        lalu <= 2 && r < 0.6
            ? 'Sedang Disewa'
            : r < 0.08
              ? 'Dibatalkan'
              : 'Selesai';
    return {
        id: `TR-${1100 + i}`,
        tanggal,
        slug,
        penyewa: penyewaDummy[Math.floor(rnd() * penyewaDummy.length)],
        hari,
        total: bySlug(slug).price * hari,
        status,
    };
}).sort((a, b) => (a.tanggal < b.tanggal ? 1 : a.tanggal > b.tanggal ? -1 : 0));

// Pendapatan bulan ini di dashboard mitra mengikuti data laporan
mitraStats.pendapatanBulanIni = laporanTransaksi
    .filter(
        (t) =>
            t.status !== 'Dibatalkan' &&
            t.tanggal.startsWith(LAPORAN_REF.slice(0, 7)),
    )
    .reduce((a, t) => a + t.total, 0);
