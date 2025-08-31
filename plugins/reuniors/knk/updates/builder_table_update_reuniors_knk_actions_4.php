<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActions4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->integer('location_id')->unsigned()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->integer('location_id')->unsigned(false)->change();
        });
    }
}
