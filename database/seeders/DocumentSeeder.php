<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $loketUser = User::where('role_id', 1)->first();
        DB::table('documents')->insert([
            [
                'document_number' => 'DOC-001',
                'name' => 'Pengajuan Anggaran 2024',
                "type" => "LS",
                "status" => "completed",
                "is_archived" => true,
                'created_by' => $loketUser->id, // User UUID dari Petugas Loket
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'document_number' => 'DOC-002',
                'name' => 'Pembayaran Pajak',
                "type" => "TU",
                "status" => "inprogress",
                "is_archived" => false,
                'created_by' => $loketUser->id, // User UUID dari Petugas Loket
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
