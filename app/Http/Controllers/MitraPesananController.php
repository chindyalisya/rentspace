<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MitraPesananController extends Controller
{
    // Permintaan masuk = pesanan berstatus "Menunggu Konfirmasi" dari user lain.
    // TODO: filter per mitra setelah tabel barang punya owner_id.
    private function requests(Request $request)
    {
        return Pesanan::with('user')
            ->where('status', Pesanan::MENUNGGU)
            ->where('user_id', '!=', $request->user()->id)
            ->latest()
            ->get()
            ->map->forMitra()
            ->values();
    }

    public function dashboard(Request $request)
    {
        return Inertia::render('mitra/dashboard', ['requests' => $this->requests($request)]);
    }

    public function kalender(Request $request)
    {
        return Inertia::render('mitra/kalender', ['requests' => $this->requests($request)]);
    }

    // PATCH /mitra/pesanan/{kode}  aksi: terima | tolak
    public function update(Request $request, Pesanan $pesanan)
    {
        $aksi = $request->validate(['aksi' => ['required', 'in:terima,tolak']])['aksi'];

        abort_unless($pesanan->status === Pesanan::MENUNGGU, 422, 'Pesanan sudah diproses.');

        $pesanan->update(['status' => $aksi === 'terima' ? 'Dikonfirmasi' : 'Dibatalkan']);

        return back();
    }
}
