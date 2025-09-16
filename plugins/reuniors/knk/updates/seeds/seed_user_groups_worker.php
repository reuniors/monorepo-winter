<?php namespace Reuniors\Knk\Updates\Seeds;

use Winter\Storm\Database\Updates\Seeder;
use Winter\User\Models\UserGroup;

class SeedWorkerUserGroupsTable extends Seeder
{
    public function run()
    {
        if (!UserGroup::where('code', 'worker')->exists()) {
            UserGroup::create([
                'name' => 'Worker',
                'code' => 'worker',
                'description' => 'Worker user.'
            ]);
        }
    }
}
