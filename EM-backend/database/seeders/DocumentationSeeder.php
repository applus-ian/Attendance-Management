<?php

namespace Database\Seeders;

use App\Models\Documentation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Documentation::insert([
            [
                'employee_id' => 1,
                'name' => 'Certificate of Employment',
                'description' => 'Previous work COC.',
                'file_url' => '',
                'document_type_id' => 1,
                'upload_date' => '2025-05-10',
                'expiry_date' => '2026-05-10',
            ]
        ]);
    }
}
