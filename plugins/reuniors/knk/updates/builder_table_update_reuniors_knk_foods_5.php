<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoods5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_foods', function($table)
        {
            $table->integer('manufacturer_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_foods', function($table)
        {
            $table->dropColumn('manufacturer_id');
        });
    }
}
