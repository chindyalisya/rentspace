<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PesananController extends Controller
{
    // GET /pesanan/{id?}  -> daftar & detail pesanan milik user
    public function index(Request $request, ?string $id = null)
    {
        $orders = Pesanan::where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map->forPenyewa()
            ->values();

        return Inertia::render('pesanan', ['id' => $id, 'orders' => $orders]);
    }

    // POST /pesanan  -> dipanggil dari tombol "Bayar sekarang"
    public function store(Request $request)
    {
        $data = $request->validate([
            'metode' => ['required', 'in:pickup,delivery'],
            'alamat' => ['nullable', 'required_if:metode,delivery', 'string', 'max:500'],
            'bayar' => ['required', 'string', 'max:50'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.slug' => ['required', 'string', 'max:100', 'exists:barangs,slug'],
            'items.*.qty' => ['required', 'integer', 'min:1', 'max:99'],
            'items.*.start' => ['required', 'date'],
            'items.*.end' => ['required', 'date', 'after_or_equal:items.*.start'],
            'items.*.total' => ['required', 'integer', 'min:0'],
        ]);

        // Mitra ditentukan server dari pemilik barang, bukan dari kiriman browser.
        $barangs = Barang::with('owner')
            ->whereIn('slug', collect($data['items'])->pluck('slug'))
            ->get()
            ->keyBy('slug');

        foreach ($barangs as $barang) {
            if ($barang->owner_id === $request->user()->id) {
                throw ValidationException::withMessages([
                    'items' => 'Kamu tidak bisa menyewa barangmu sendiri ('.$barang->nama.').',
                ]);
            }
        }

        foreach ($barangs as $barang) {
            if (! $barang->aktif) {
                throw ValidationException::withMessages([
                    'items' => $barang->nama.' sedang dinonaktifkan mitra dan tidak bisa disewa.',
                ]);
            }
        }

        $kodes = DB::transaction(function () use ($data, $request, $barangs) {
            $kodes = [];

            foreach ($data['items'] as $i => $row) {
                do {
                    $kode = 'RS-'.random_int(1000, 99999);
                } while (Pesanan::where('kode', $kode)->exists());

                Pesanan::create([
                    'kode' => $kode,
                    'user_id' => $request->user()->id,
                    'slug' => $row['slug'],
                    'mitra' => $barangs[$row['slug']]->owner->name,
                    'qty' => $row['qty'],
                    'mulai' => $row['start'],
                    'selesai' => $row['end'],
                    'metode' => $data['metode'],
                    'alamat' => $data['metode'] === 'delivery' ? $data['alamat'] : null,
                    'bayar' => $data['bayar'],
                    // ongkir dibebankan sekali, di pesanan pertama
                    'total' => $row['total'] + ($i === 0 && $data['metode'] === 'delivery' ? 10000 : 0),
                    'status' => Pesanan::MENUNGGU,
                ]);

                $kodes[] = $kode;
            }

            return $kodes;
        });

        return back()->with('checkoutKodes', $kodes);
    }

    // POST /pesanan/{kode}/ulasan -> penyewa memberi bintang setelah pesanan selesai (sekali saja).
    public function ulasan(Request $request, Pesanan $pesanan)
    {
        abort_unless($pesanan->user_id === $request->user()->id, 403);

        $data = $request->validate([
            'rating' => ['required', 'integer', 'between:1,5'],
            'ulasan' => ['nullable', 'string', 'max:500'],
        ]);

        $ok = Pesanan::whereKey($pesanan->id)
            ->where('status', Pesanan::SELESAI)
            ->whereNull('rating')
            ->update(['rating' => $data['rating'], 'ulasan' => $data['ulasan'] ?? null]);

        if (! $ok) {
            throw ValidationException::withMessages([
                'rating' => 'Ulasan hanya bisa diberikan sekali, setelah pesanan selesai.',
            ]);
        }

        return back();
    }

    // PATCH /pesanan/{kode}/serah-terima -> penyewa konfirmasi barang sudah diterima.
    // Hanya bisa kalau mitra sudah menerima pesanan.
    public function serahTerima(Request $request, Pesanan $pesanan)
    {
        return $this->ubahStatus(
            $request,
            $pesanan,
            [Pesanan::DIKONFIRMASI],
            Pesanan::DISEWA,
            'Serah terima baru bisa dilakukan setelah mitra menerima pesananmu.',
        );
    }

    // PATCH /pesanan/{kode}/kembalikan -> penyewa ajukan pengembalian.
    // Hanya bisa kalau barang sedang disewa (artinya mitra sudah menerima).
    public function kembalikan(Request $request, Pesanan $pesanan)
    {
        return $this->ubahStatus(
            $request,
            $pesanan,
            [Pesanan::DISEWA, 'Jatuh Tempo'],
            Pesanan::DIKEMBALIKAN,
            'Pesanan belum berjalan, jadi belum bisa dikembalikan. Tunggu mitra menerima dan barang diserahkan dulu.',
        );
    }

    private function ubahStatus(Request $request, Pesanan $pesanan, array $dari, string $ke, string $pesan)
    {
        abort_unless($pesanan->user_id === $request->user()->id, 403);

        // Update atomik: hanya berhasil kalau status masih sesuai.
        $ok = Pesanan::whereKey($pesanan->id)->whereIn('status', $dari)->update(['status' => $ke]);

        if (! $ok) {
            throw ValidationException::withMessages(['status' => $pesan]);
        }

        return back();
    }
}
