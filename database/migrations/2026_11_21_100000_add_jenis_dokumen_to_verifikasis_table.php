<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('verifikasis', function (Blueprint $t) {
            // ktm | ktp  (kolom foto_ktm menyimpan foto dokumen yang dipilih)
            $t->string('jenis_dokumen')->default('ktm')->after('user_id');
        });
    }

    public function down(): void
    {
        Schema::table('verifikasis', function (Blueprint $t) {
            $t->dropColumn('jenis_dokumen');
        });
    }
};
