<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DocumentType::insert([
            ['name' => 'contract'],
            ['name' => 'certificate'],
            ['name' => 'ID'],
            ['name' => 'training record'],
        ]);
    }
}
