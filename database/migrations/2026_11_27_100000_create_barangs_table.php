<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Pemilik barang = akun mitra. Slug sama dengan slug di lib/dummy.ts,
        // jadi tampilan katalog tidak berubah tapi server tahu siapa mitranya.
        Schema::create('barangs', function (Blueprint $t) {
            $t->id();
            $t->string('slug')->unique();
            $t->string('nama');
            $t->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('barangs');
    }
};
