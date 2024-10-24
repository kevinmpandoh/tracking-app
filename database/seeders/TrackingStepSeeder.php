<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use Carbon\Carbon;

class TrackingStepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Inisiasi waktu awal
        $startTime = Carbon::now();

        $loketUser = User::where('role_id', 1)->first();
        $penelitiDokumenUser = User::where('role_id', 2)->first();
        $penelitiPajakUser = User::where('role_id', 3)->first();
        $kasubidKasdaUser = User::where('role_id', 4)->first();
        $kasubidBelanjaUser = User::where('role_id', 5)->first();
        $jabatanFungsionalUser = User::where('role_id', 6)->first();
        $budUser = User::where('role_id', 7)->first();

        DB::table('tracking_steps')->insert([
            // Tracking Step untuk dokumen pertama
            [
                'document_id' => 1,
                'step_number' => 1,
                'title' => 'Dokumen telah diajukan oleh Petugas Loket',
                'status' => 'completed',
                'processed_by' => $loketUser->id, // User UUID dari Petugas Loket
                'role_id' => 1, // Role Petugas Loket
                'created_at' => $startTime, // Waktu awal
                'updated_at' => $startTime
            ],
            [
                'document_id' => 1,
                'step_number' => 2,
                'title' => 'Dokumen telah disetujui oleh Peneliti Dokumen',
                'status' => 'completed',
                'processed_by' => $penelitiDokumenUser->id, // User UUID dari Peneliti Dokumen
                'role_id' => 2, // Role Peneliti Dokumen
                'created_at' => $startTime->copy()->addMinutes(10), // Tambahkan 10 menit
                'updated_at' => $startTime->copy()->addMinutes(10)
            ],
            //    complete samapi terakhir
            [
                'document_id' => 1,
                'step_number' => 3,
                'title' => 'Dokumen telah disetujui oleh Peneliti Pajak',
                'status' => 'completed',
                'processed_by' => $penelitiPajakUser->id, // User UUID dari Peneliti Pajak
                'role_id' => 3, // Role Peneliti Pajak
                'created_at' => $startTime->copy()->addMinutes(20), // Tambahkan 20 menit
                'updated_at' => $startTime->copy()->addMinutes(20)
            ],
            [
                'document_id' => 1,
                'step_number' => 4,
                'title' => 'Dokumen telah disetujui oleh Kasubid Kasda',
                'status' => 'completed',
                'processed_by' => $kasubidKasdaUser->id, // User UUID dari Peneliti Pajak
                'role_id' => 4, // Role Kasubid Kasda
                'created_at' => $startTime->copy()->addMinutes(30), // Tambahkan 30 menit
                'updated_at' => $startTime->copy()->addMinutes(30)
            ],
            [
                'document_id' => 1,
                'step_number' => 5,
                'title' => 'Dokumen telah disetujui oleh Kasubid Belanja',
                'status' => 'completed',
                'processed_by' => $kasubidBelanjaUser->id, // User UUID dari Peneliti Pajak
                'role_id' => 5, // Role Kasubid Belanja
                'created_at' => $startTime->copy()->addMinutes(40), // Tambahkan 40 menit
                'updated_at' => $startTime->copy()->addMinutes(40)
            ],
            [
                'document_id' => 1,
                'step_number' => 6,
                'title' => 'Dokumen telah disetujui oleh Jabatan Fungsional',
                'status' => 'completed',
                'processed_by' => $jabatanFungsionalUser->id, // User UUID dari Kasubid Kasda    
                'role_id' => 6,
                'created_at' => $startTime->copy()->addMinutes(50), // Tambahkan 50 menit
                'updated_at' => $startTime->copy()->addMinutes(50)
            ],
            [
                'document_id' => 1,
                'step_number' => 7,
                'title' => 'Dokumen telah disetujui oleh BUD/Kuasa BUD',
                'status' => 'completed',
                'processed_by' => $budUser->id, // User UUID dari Peneliti Pajak
                'role_id' => 7,
                'created_at' => $startTime->copy()->addMinutes(60), // Tambahkan 60 menit
                'updated_at' => $startTime->copy()->addMinutes(60)
            ],
            [
                'document_id' => 1,
                'step_number' => 8,
                'title' => 'SP2D telah dicetak oleh Peneliti Dokumen',
                'status' => 'completed',
                'processed_by' => $penelitiDokumenUser->id, // User UUID dari Peneliti Dokumen
                'role_id' => 2,
                'created_at' => $startTime->copy()->addMinutes(70), // Tambahkan 70 menit
                'updated_at' => $startTime->copy()->addMinutes(70)
            ],
            [
                'document_id' => 1,
                'step_number' => 9,
                'title' => 'SP2D telah ditandatangani oleh BUD/Kuasa BUD',
                'status' => 'completed',
                'processed_by' => $budUser->id, // User UUID dari Peneliti Pajak
                'role_id' => 7,
                'created_at' => $startTime->copy()->addMinutes(80), // Tambahkan 80 menit
                'updated_at' => $startTime->copy()->addMinutes(80)
            ],
            [
                'document_id' => 1,
                'step_number' => 10,
                'title' => 'Surat perintah pencairan dana (SP2D) telah dikirim ke bank',
                'status' => 'completed',
                'processed_by' => $budUser->id, // User UUID dari Peneliti Pajak
                'role_id' => 7,
                'created_at' => $startTime->copy()->addMinutes(90), // Tambahkan 90 menit
                'updated_at' => $startTime->copy()->addMinutes(90)
            ],

        ]);
    }
}
