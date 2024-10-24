<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['keterangan' => 'Petugas Loket'],
            ['keterangan' => 'Peneliti Dokumen'],
            ['keterangan' => 'Peneliti Pajak'],
            ['keterangan' => 'Kasubid Kasda'],
            ['keterangan' => 'Kasubid Belanja'],
            ['keterangan' => 'Jabatan Fungsional'],
            ['keterangan' => 'BUD/Kuasa BUD'],
            ['keterangan' => "Admin"],
        ]);
    }
}
