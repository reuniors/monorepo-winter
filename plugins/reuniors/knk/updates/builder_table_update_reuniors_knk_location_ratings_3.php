<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRatings3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_ratings', function($table)
        {
            $table->float('grade', 10, 0)->nullable(false)->default(0)->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_ratings', function($table)
        {
            $table->integer('grade')->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
}
