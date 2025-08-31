<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->double('average_price', 10, 0)->nullable();
            $table->double('average_price_for_two', 10, 0)->nullable();
            $table->bigInteger('rating_count')->unsigned()->default(0);
            $table->double('rating_average_grade', 10, 0)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('average_price');
            $table->dropColumn('average_price_for_two');
            $table->dropColumn('rating_count');
            $table->dropColumn('rating_average_grade');
        });
    }
}
