<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodAddons8 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->string('outsource_code', 191)->nullable();
            $table->string('outsource', 2)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_addons', function($table)
        {
            $table->dropColumn('outsource_code');
            $table->dropColumn('outsource');
        });
    }
}
