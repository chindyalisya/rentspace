<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\VerifikasiController;

Route::get('/', fn () => Inertia::render('onboarding'))->name('home');

// Halaman prototipe (sementara tanpa login supaya mudah dicek)
Route::get('/home', fn () => Inertia::render('home'))->name('beranda');
Route::get('/katalog/{kategori?}', fn ($kategori = 'semua') => Inertia::render('katalog', ['kategori' => $kategori]));
Route::get('/cari', fn (Request $r) => Inertia::render('katalog', ['q' => $r->query('q', '')]));
Route::get('/barang/{slug}', fn ($slug) => Inertia::render('barang', ['slug' => $slug]));
Route::get('/keranjang', fn () => Inertia::render('keranjang'));
Route::get('/checkout', fn () => Inertia::render('checkout'));
Route::get('/pesanan/{id?}', fn ($id = null) => Inertia::render('pesanan', ['id' => $id]));
Route::get('/profil', fn () => Inertia::render('profil'));
Route::get('/alamat', fn () => Inertia::render('alamat'));
Route::get('/dompet', fn () => Inertia::render('dompet'));
Route::get('/bantuan', fn () => Inertia::render('bantuan'));

Route::middleware('auth')->group(function () {
    Route::get('/verifikasi', [VerifikasiController::class, 'show'])->name('verifikasi');
    Route::post('/verifikasi', [VerifikasiController::class, 'store'])->name('verifikasi.kirim');
});

Route::middleware(['auth', 'can:admin'])->prefix('admin')->group(function () {
    Route::get('/verifikasi', [VerifikasiController::class, 'index'])->name('admin.verifikasi');
    Route::get('/verifikasi/{verifikasi}/foto/{jenis}', [VerifikasiController::class, 'foto'])
        ->where('jenis', 'ktm|selfie')
        ->name('admin.verifikasi.foto');
    Route::patch('/verifikasi/{verifikasi}', [VerifikasiController::class, 'review'])
        ->name('admin.verifikasi.review');
});

Route::prefix('mitra')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('mitra/dashboard'));
    Route::get('/barang', fn () => Inertia::render('mitra/barang'));
    Route::get('/tambah-barang', fn () => Inertia::render('mitra/tambah-barang'));
    Route::get('/kalender', fn () => Inertia::render('mitra/kalender'));
});

// Dashboard bawaan starter kit tetap butuh login
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';