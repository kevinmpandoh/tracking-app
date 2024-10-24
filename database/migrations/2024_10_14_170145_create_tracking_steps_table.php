<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tracking_steps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('document_id'); // referensi ke tabel documents
            $table->foreign('document_id')->references('id')->on('documents')->onDelete('cascade');

            $table->integer('step_number'); // urutan step (1, 2, 3, ...)
            $table->string('title'); // deskripsi step (misal: "Diterima oleh Petugas Loket")
            $table->enum('status', ['inprogress', 'completed', 'rejected'])->default('inprogress'); // status step

            // user yang memproses step ini tapi bisa null jika belum diproses
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('cascade');


            // catatan jika step ini ditolak
            $table->text('rejected_note')->nullable();

            // role yang berhak memproses step ini
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracking_steps');
    }
};
