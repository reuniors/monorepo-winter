<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRestaurantMenu3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_restaurant_menu', function($table)
        {
            $table->dateTime('relations_updated_at')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_restaurant_menu', function($table)
        {
            $table->dropColumn('relations_updated_at');
        });
    }
}
