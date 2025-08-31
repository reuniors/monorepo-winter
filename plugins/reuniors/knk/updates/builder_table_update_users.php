<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateUsers extends Migration
{
    public function up()
    {
        Schema::table('users', function($table)
        {
            $table->integer('city_id')->unsigned();
        });
    }

    public function down()
    {
        Schema::table('users', function($table)
        {
            $table->dropColumn('city_id');
        });
    }
}
