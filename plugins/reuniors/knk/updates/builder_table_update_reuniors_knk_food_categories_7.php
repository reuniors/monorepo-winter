<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodCategories7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->string('outsource', 2)->nullable();
            $table->string('outsource_code')->nullable();
            $table->string('identifier')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->dropColumn('outsource');
            $table->dropColumn('outsource_code');
            $table->dropColumn('identifier');
        });
    }
}
