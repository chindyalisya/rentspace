<?php

use App\Http\Controllers\MitraPesananController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\VerifikasiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('onboarding'))->name('home');

// Verifikasi identitas: wajib login, tapi belum perlu terverifikasi
Route::middleware('auth')->group(function () {
    Route::get('/verifikasi', [VerifikasiController::class, 'show'])->name('verifikasi');
    Route::post('/verifikasi', [VerifikasiController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verifikasi.kirim');

    Route::get('/notifikasi', function (Request $request) {
        $v = $request->user()->verifikasi;

        return Inertia::render('notifikasi', [
            'verifikasi' => $v ? [
                'status' => $v->status,
                'alasan' => $v->alasan,
                'jenis_dokumen' => $v->jenis_dokumen,
                'diperiksa_at' => $v->diperiksa_at,
            ] : null,
        ]);
    })->name('notifikasi');
});

// Sudah login + sudah mengirim KTM/KTP (pending atau approved)
Route::middleware(['auth', 'verifikasi'])->group(function () {
    Route::get('/home', fn () => Inertia::render('home'))->name('beranda');
    Route::get('/katalog/{kategori?}', fn ($kategori = 'semua') => Inertia::render('katalog', ['kategori' => $kategori]));
    Route::get('/cari', fn (Request $r) => Inertia::render('katalog', ['q' => $r->query('q', '')]));
    Route::get('/barang/{slug}', fn ($slug) => Inertia::render('barang', ['slug' => $slug]));
    Route::get('/keranjang', fn () => Inertia::render('keranjang'));
    Route::get('/pesanan/{id?}', [PesananController::class, 'index']);
    Route::get('/profil', fn () => Inertia::render('profil'));
    Route::get('/alamat', fn () => Inertia::render('alamat'));
    Route::get('/dompet', fn () => Inertia::render('dompet'));
    Route::get('/bantuan', fn () => Inertia::render('bantuan'));
});

// Transaksi & mitra: wajib sudah disetujui admin
Route::middleware(['auth', 'verifikasi:approved'])->group(function () {
    Route::get('/checkout', fn () => Inertia::render('checkout'));
    Route::post('/pesanan', [PesananController::class, 'store'])->name('pesanan.store');

    Route::prefix('mitra')->group(function () {
        Route::get('/dashboard', [MitraPesananController::class, 'dashboard']);
        Route::get('/barang', fn () => Inertia::render('mitra/barang'));
        Route::get('/tambah-barang', fn () => Inertia::render('mitra/tambah-barang'));
        Route::get('/kalender', [MitraPesananController::class, 'kalender']);
        Route::patch('/pesanan/{pesanan:kode}', [MitraPesananController::class, 'update']);
        Route::get('/laporan', fn () => Inertia::render('mitra/laporan'));
    });
});

Route::middleware(['auth', 'can:admin'])->prefix('admin')->group(function () {
    Route::get('/verifikasi', [VerifikasiController::class, 'index'])->name('admin.verifikasi');
    Route::get('/verifikasi/{verifikasi}/foto/{jenis}', [VerifikasiController::class, 'foto'])
        ->where('jenis', 'ktm|selfie')
        ->name('admin.verifikasi.foto');
    Route::patch('/verifikasi/{verifikasi}', [VerifikasiController::class, 'review'])
        ->name('admin.verifikasi.review');
});

// Dashboard bawaan starter kit tetap butuh login
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
