<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRestaurantMenu5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_restaurant_menu', function($table)
        {
            $table->text('description')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_restaurant_menu', function($table)
        {
            $table->dropColumn('description');
        });
    }
}
