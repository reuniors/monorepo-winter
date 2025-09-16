<?php namespace Reuniors\Knk\Updates\Seeds;

use Winter\Storm\Database\Updates\Seeder;
use Winter\User\Models\UserGroup;

class SeedUserGroupsTable extends Seeder
{
    public function run()
    {
        if (!UserGroup::where('code', 'agent')->exists()) {
            UserGroup::create([
                'name' => 'Agent',
                'code' => 'agent',
                'description' => 'Locations agent.'
            ]);
        }

        if (!UserGroup::where('code', 'owner')->exists()) {
            UserGroup::create([
                'name' => 'Owner',
                'code' => 'owner',
                'description' => 'Locations owner.'
            ]);
        }

        if (!UserGroup::where('code', 'social-google')->exists()) {
            UserGroup::create([
                'name' => 'Social Google',
                'code' => 'social-google',
                'description' => 'Login with social google.'
            ]);
        }

        if (!UserGroup::where('code', 'admin')->exists()) {
            UserGroup::create([
                'name' => 'Admin',
                'code' => 'admin',
                'description' => 'Admin user.'
            ]);
        }
    }
}
