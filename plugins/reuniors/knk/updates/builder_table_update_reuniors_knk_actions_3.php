<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActions3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->integer('location_id')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->integer('location_id')->nullable(false)->change();
        });
    }
}
