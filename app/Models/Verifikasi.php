<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Verifikasi extends Model
{
    protected $fillable = [
        'user_id', 'jenis_dokumen', 'foto_ktm', 'foto_selfie', 'status', 'alasan', 'diperiksa_at',
    ];

    protected function casts(): array
    {
        return ['diperiksa_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}