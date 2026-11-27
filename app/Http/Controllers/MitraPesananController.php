<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MitraPesananController extends Controller
{
    // Pesanan untuk barang milik mitra yang sedang login (bukan pesanannya sendiri).
    private function milik(Request $request)
    {
        $id = $request->user()->id;

        return Pesanan::with('user')
            ->whereHas('barang', fn ($q) => $q->where('owner_id', $id))
            ->where('user_id', '!=', $id);
    }

    private function daftar(Request $request, array $status)
    {
        return $this->milik($request)
            ->whereIn('status', $status)
            ->latest()
            ->get()
            ->map->forMitra()
            ->values();
    }

    /** Slug barang milik mitra ini. */
    private function slugBarang(Request $request): array
    {
        return Barang::where('owner_id', $request->user()->id)->orderBy('id')->pluck('slug')->all();
    }

    /** Slug barangnya yang sedang disewa orang. */
    private function slugDisewa(Request $request): array
    {
        return $this->milik($request)
            ->whereIn('status', [Pesanan::DISEWA, 'Jatuh Tempo'])
            ->pluck('slug')
            ->unique()
            ->values()
            ->all();
    }

    public function dashboard(Request $request)
    {
        return Inertia::render('mitra/dashboard', [
            // menunggu diterima / ditolak
            'requests' => $this->daftar($request, [Pesanan::MENUNGGU]),
            // sudah diterima mitra dan sedang berjalan
            'aktif' => $this->daftar($request, [Pesanan::DIKONFIRMASI, Pesanan::DISEWA, 'Jatuh Tempo']),
            // penyewa sudah ajukan pengembalian, menunggu konfirmasi mitra
            'pengembalian' => $this->daftar($request, [Pesanan::DIKEMBALIKAN]),
            'barang' => $this->slugBarang($request),
        ]);
    }

    public function barang(Request $request)
    {
        return Inertia::render('mitra/barang', [
            'barang' => $this->slugBarang($request),
            'disewa' => $this->slugDisewa($request),
        ]);
    }

    public function kalender(Request $request)
    {
        return Inertia::render('mitra/kalender', [
            'requests' => $this->daftar($request, [Pesanan::MENUNGGU]),
            'barang' => $this->slugBarang($request),
        ]);
    }

    private function barangSaya(Request $request, string $slug): Barang
    {
        return Barang::where('slug', $slug)
            ->where('owner_id', $request->user()->id)
            ->firstOrFail();
    }

    // GET /mitra/barang/{slug}/edit
    public function editBarang(Request $request, string $slug)
    {
        $barang = $this->barangSaya($request, $slug);

        return Inertia::render('mitra/edit-barang', [
            'slug' => $barang->slug,
            'aktif' => $barang->aktif,
        ]);
    }

    // PATCH /mitra/barang/{slug}
    public function updateBarang(Request $request, string $slug)
    {
        $barang = $this->barangSaya($request, $slug);

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'harga' => ['required', 'integer', 'min:1000', 'max:100000000'],
            'deposit' => ['required', 'integer', 'min:0', 'max:100000000'],
            'deskripsi' => ['nullable', 'string', 'max:1000'],
            'aktif' => ['required', 'boolean'],
        ]);

        $barang->update($data);

        return redirect('/mitra/barang');
    }

    // PATCH /mitra/pesanan/{kode}  aksi: terima | tolak | selesai
    //   terima  : Menunggu Konfirmasi -> Dikonfirmasi
    //   tolak   : Menunggu Konfirmasi -> Dibatalkan
    //   selesai : Dikembalikan        -> Selesai (barang sudah kembali ke mitra)
    public function update(Request $request, Pesanan $pesanan)
    {
        // Hanya pemilik barang yang boleh memproses pesanannya.
        abort_unless(
            $pesanan->barang()->where('owner_id', $request->user()->id)->exists(),
            403,
            'Pesanan ini bukan untuk barangmu.',
        );

        $aksi = $request->validate(['aksi' => ['required', 'in:terima,tolak,selesai']])['aksi'];

        [$dari, $ke] = [
            'terima' => [Pesanan::MENUNGGU, Pesanan::DIKONFIRMASI],
            'tolak' => [Pesanan::MENUNGGU, Pesanan::DIBATALKAN],
            'selesai' => [Pesanan::DIKEMBALIKAN, Pesanan::SELESAI],
        ][$aksi];

        // Update atomik: gagal kalau status sudah berubah (mis. diproses dua kali).
        $ok = Pesanan::whereKey($pesanan->id)->where('status', $dari)->update(['status' => $ke]);

        abort_unless($ok, 422, 'Status pesanan tidak sesuai untuk aksi ini.');

        return back();
    }
}
