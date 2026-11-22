<?php

namespace App\Http\Controllers;

use App\Models\Verifikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VerifikasiController extends Controller
{
    public function show(Request $request)
    {
        // Admin tidak perlu verifikasi identitas
        if ($request->user()->is_admin) {
            return redirect()->route('admin.verifikasi');
        }

        $v = $request->user()->verifikasi;

        return Inertia::render('verifikasi', [
            'status' => $v?->status ?? 'none',
            'reason' => $v?->alasan,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenis'  => ['required', 'in:ktm,ktp'],
            'ktm'    => ['required', 'image', 'max:4096'],
            'selfie' => ['required', 'image', 'max:4096'],
        ]);

        $lama = $request->user()->verifikasi;

        // hanya boleh kirim kalau belum pernah atau sebelumnya ditolak
        if ($lama && $lama->status !== 'rejected') {
            return redirect()->route('verifikasi');
        }
        if ($lama) {
            Storage::delete([$lama->foto_ktm, $lama->foto_selfie]);
        }

        $request->user()->verifikasi()->updateOrCreate([], [
            'jenis_dokumen' => $request->input('jenis'),
            'foto_ktm'     => $request->file('ktm')->store('verifikasi'),
            'foto_selfie'  => $request->file('selfie')->store('verifikasi'),
            'status'       => 'pending',
            'alasan'       => null,
            'diperiksa_at' => null,
        ]);

        return redirect()->route('verifikasi');
    }

    // ---- khusus admin ----

    public function index()
    {
        return Inertia::render('admin/verifikasi', [
            'items' => Verifikasi::with('user:id,name,email')
                ->orderByRaw("status = 'pending' desc")
                ->latest()
                ->get(),
        ]);
    }

    public function foto(Verifikasi $verifikasi, string $jenis)
    {
        $path = $jenis === 'selfie' ? $verifikasi->foto_selfie : $verifikasi->foto_ktm;

        return Storage::response($path);
    }

    public function review(Request $request, Verifikasi $verifikasi)
    {
        $data = $request->validate([
            'status' => ['required', 'in:approved,rejected'],
            'alasan' => ['nullable', 'string', 'max:255'],
        ]);

        $verifikasi->update($data + ['diperiksa_at' => now()]);

        return back();
    }
}