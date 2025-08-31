<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActions5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->string('entity_type');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->dropColumn('entity_type');
        });
    }
}
