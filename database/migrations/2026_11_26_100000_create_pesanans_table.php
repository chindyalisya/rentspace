<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pesanans', function (Blueprint $t) {
            $t->id();
            $t->string('kode')->unique();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete(); // penyewa
            $t->string('slug');
            $t->string('mitra')->default('Latuconsina');
            $t->unsignedSmallInteger('qty')->default(1);
            $t->date('mulai');
            $t->date('selesai');
            $t->string('metode')->default('pickup'); // pickup | delivery
            $t->text('alamat')->nullable();
            $t->string('bayar');
            $t->unsignedBigInteger('total');
            $t->string('status')->default('Menunggu Konfirmasi');
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
