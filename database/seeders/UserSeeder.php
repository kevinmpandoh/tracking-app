<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

// Role
use App\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'username' => 'admin',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Admin')->first()->id,
            ],
            [
                'name' => 'Petugas Loket',
                'username' => 'petugas_loket',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Petugas Loket')->first()->id,
            ],

            [
                'name' => 'Peneliti Dokumen',
                'username' => 'peneliti_dokumen',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Peneliti Dokumen')->first()->id,
            ],

            [
                'name' => 'Peneliti Pajak',
                'username' => 'peneliti_pajak',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Peneliti Pajak')->first()->id,
            ],

            [
                'name' => 'Kasubid Kasda',
                'username' => 'kasubid_kasda',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Kasubid Kasda')->first()->id,
            ],

            [
                'name' => 'Kasubid Belanja',
                'username' => 'kasubid_belanja',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Kasubid Belanja')->first()->id,
            ],

            [
                'name' => 'Jabatan Fungsional',
                'username' => 'jabatan_fungsional',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'Jabatan Fungsional')->first()->id,
            ],

            [
                'name' => 'BUD/Kuasa BUD',
                'username' => 'bud_kuasa_bud',
                'password' => bcrypt('password'),
                'role_id' => Role::where('keterangan', 'BUD/Kuasa BUD')->first()->id,
            ],
        ];

        foreach ($users as $user) {
            \App\Models\User::create($user);
        }
    }
}
