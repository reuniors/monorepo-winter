<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateUsers2 extends Migration
{
    public function up()
    {
        Schema::table('users', function($table)
        {
            $table->integer('city_id')->unsigned()->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('users', function($table)
        {
            $table->integer('city_id')->unsigned()->nullable(false)->change();
        });
    }
}

