<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicContents extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_contents', function($table)
    {
        $table->string('relation_model');
    });
}

public function down()
{
    Schema::table('reuniors_evodic_contents', function($table)
    {
        $table->dropColumn('relation_model');
    });
}
}
