<?php namespace Reuniors\Reservations\Updates\Seeds;

use Winter\Storm\Database\Updates\Seeder;
use Winter\User\Models\UserGroup;

class SeedUserGroupsTable extends Seeder
{
    public function run()
    {
        if (!UserGroup::where('code', 'worker')->exists()) {
            UserGroup::create([
                'name' => 'Worker',
                'code' => 'worker',
                'description' => 'Location worker group.'
            ]);
        }
    }
} 