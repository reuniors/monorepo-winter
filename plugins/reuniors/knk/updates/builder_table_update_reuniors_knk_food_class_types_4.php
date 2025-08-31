<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodClassTypes4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_class_types', function($table)
        {
            $table->string('identifier')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_class_types', function($table)
        {
            $table->dropColumn('identifier');
        });
    }
}
