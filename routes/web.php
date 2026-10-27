<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', fn () => Inertia::render('onboarding'))->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/home', fn () => Inertia::render('home'))->name('beranda');
    Route::get('/katalog/{kategori?}', fn ($kategori = 'semua') => Inertia::render('katalog', ['kategori' => $kategori]));
    Route::get('/cari', fn (Request $r) => Inertia::render('katalog', ['q' => $r->query('q', '')]));
    Route::get('/barang/{slug}', fn ($slug) => Inertia::render('barang', ['slug' => $slug]));
    Route::get('/keranjang', fn () => Inertia::render('keranjang'));
    Route::get('/checkout', fn () => Inertia::render('checkout'));
    Route::get('/pesanan/{id?}', fn ($id = null) => Inertia::render('pesanan', ['id' => $id]));
    Route::get('/profil', fn () => Inertia::render('profil'));
    Route::get('/verifikasi', fn () => Inertia::render('verifikasi', ['status' => 'none']))->name('verifikasi');
    Route::get('/dashboard', fn () => Inertia::render('mitra/dashboard'));
    Route::get('/barang', fn () => Inertia::render('mitra/barang'));
    Route::get('/tambah-barang', fn () => Inertia::render('mitra/tambah-barang'));
    Route::get('/kalender', fn () => Inertia::render('mitra/kalender'));
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
