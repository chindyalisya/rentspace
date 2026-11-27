<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Hasil edit mitra. Kolom null = pakai nilai bawaan dari lib/dummy.ts.
        Schema::table('barangs', function (Blueprint $t) {
            $t->unsignedInteger('harga')->nullable();
            $t->unsignedInteger('deposit')->nullable();
            $t->text('deskripsi')->nullable();
            $t->boolean('aktif')->default(true);
        });

        // Ulasan penyewa setelah pesanan selesai.
        Schema::table('pesanans', function (Blueprint $t) {
            $t->unsignedTinyInteger('rating')->nullable();
            $t->text('ulasan')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('barangs', function (Blueprint $t) {
            $t->dropColumn(['harga', 'deposit', 'deskripsi', 'aktif']);
        });
        Schema::table('pesanans', function (Blueprint $t) {
            $t->dropColumn(['rating', 'ulasan']);
        });
    }
};
