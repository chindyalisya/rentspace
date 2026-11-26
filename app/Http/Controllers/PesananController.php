<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'items.*.slug' => ['required', 'string', 'max:100'],
            'items.*.qty' => ['required', 'integer', 'min:1', 'max:99'],
            'items.*.start' => ['required', 'date'],
            'items.*.end' => ['required', 'date', 'after_or_equal:items.*.start'],
            'items.*.mitra' => ['nullable', 'string', 'max:100'],
            'items.*.total' => ['required', 'integer', 'min:0'],
        ]);

        $kodes = DB::transaction(function () use ($data, $request) {
            $kodes = [];

            foreach ($data['items'] as $i => $row) {
                do {
                    $kode = 'RS-'.random_int(1000, 99999);
                } while (Pesanan::where('kode', $kode)->exists());

                Pesanan::create([
                    'kode' => $kode,
                    'user_id' => $request->user()->id,
                    'slug' => $row['slug'],
                    'mitra' => $row['mitra'] ?? 'Latuconsina',
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
}
