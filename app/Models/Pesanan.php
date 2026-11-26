<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pesanan extends Model
{
    public const MENUNGGU = 'Menunggu Konfirmasi';

    protected $fillable = [
        'kode', 'user_id', 'slug', 'mitra', 'qty', 'mulai', 'selesai',
        'metode', 'alamat', 'bayar', 'total', 'status',
    ];

    protected function casts(): array
    {
        return ['mulai' => 'date', 'selesai' => 'date'];
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
        ];
    }

    /** Bentuk data yang sama dengan dummy `mitraRequests` di frontend. */
    public function forMitra(): array
    {
        return [
            'id' => $this->kode,
            'slug' => $this->slug,
            'penyewa' => $this->user?->name ?? '-',
            'start' => $this->mulai->locale('id')->translatedFormat('j M'),
            'end' => $this->selesai->locale('id')->translatedFormat('j M Y'),
            'total' => $this->total,
        ];
    }
}
