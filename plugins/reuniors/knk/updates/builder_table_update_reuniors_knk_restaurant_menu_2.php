<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkRestaurantMenu2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_restaurant_menu', function($table)
        {
            $table->string('identifier')->nullable();
            $table->string('outsource', 2)->nullable();
            $table->string('outsource_code')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_restaurant_menu', function($table)
        {
            $table->dropColumn('identifier');
            $table->dropColumn('outsource');
            $table->dropColumn('outsource_code');
        });
    }
}
