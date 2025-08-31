<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodClasses2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_classes', function($table)
        {
            $table->string('identifier')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_classes', function($table)
        {
            $table->dropColumn('identifier');
        });
    }
}
