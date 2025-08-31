<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaceTypes2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_place_types', function($table)
    {
        $table->renameColumn('type', 'category_code');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_place_types', function($table)
    {
        $table->renameColumn('category_code', 'type');
    });
}
}
