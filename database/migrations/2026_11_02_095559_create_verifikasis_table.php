<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $t) {
            $t->boolean('is_admin')->default(false);
        });

        Schema::create('verifikasis', function (Blueprint $t) {
    $t->id();
    $t->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
    $t->string('foto_ktm');
    $t->string('foto_selfie');
    $t->string('status')->default('pending'); // pending | approved | rejected
    $t->string('alasan')->nullable();
    $t->timestamp('diperiksa_at')->nullable();
    $t->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('verifikasis');

        Schema::table('users', function (Blueprint $t) {
            $t->dropColumn('is_admin');
        });
    }
};