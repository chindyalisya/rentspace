<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pesanan extends Model
{
    public const MENUNGGU = 'Menunggu Konfirmasi';      // pesanan baru, belum dilihat mitra
    public const DIKONFIRMASI = 'Dikonfirmasi';          // mitra sudah menerima
    public const DISEWA = 'Sedang Disewa';               // barang sudah diterima penyewa
    public const DIKEMBALIKAN = 'Dikembalikan';          // penyewa mengajukan pengembalian
    public const SELESAI = 'Selesai';                    // mitra mengonfirmasi barang kembali
    public const DIBATALKAN = 'Dibatalkan';              // ditolak mitra

    protected $fillable = [
        'kode', 'user_id', 'slug', 'mitra', 'qty', 'mulai', 'selesai',
        'metode', 'alamat', 'bayar', 'total', 'status', 'rating', 'ulasan',
    ];

    protected function casts(): array
    {
        return ['mulai' => 'date', 'selesai' => 'date'];
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'slug', 'slug');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** Bentuk data yang sama dengan dummy `orders` di frontend. */
    public function forPenyewa(): array
    {
        return [
            'id' => $this->kode,
            'slug' => $this->slug,
            'status' => $this->status,
            'start' => $this->mulai->locale('id')->translatedFormat('j M'),
            'end' => $this->selesai->locale('id')->translatedFormat('j M Y'),
            'total' => $this->total,
            'mitra' => $this->mitra,
            'lokasi' => $this->metode === 'delivery' ? 'Diantar' : 'Kampus UNNES',
            'bayar' => $this->bayar,
            'rating' => $this->rating,
            'ulasan' => $this->ulasan,
        ];
    }

    /** Bentuk data yang sama dengan dummy `mitraRequests` di frontend. */
    public function forMitra(): array
    {
        return [
            'id' => $this->kode,
            'slug' => $this->slug,
            'penyewa' => $this->user?->name ?? '-',
            'status' => $this->status,
            'start' => $this->mulai->locale('id')->translatedFormat('j M'),
            'end' => $this->selesai->locale('id')->translatedFormat('j M Y'),
            'total' => $this->total,
        ];
    }
}
