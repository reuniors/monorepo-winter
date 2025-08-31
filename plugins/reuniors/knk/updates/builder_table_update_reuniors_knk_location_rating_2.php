<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationRating2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_rating', function($table)
        {
            $table->dropColumn('deleted_at');
            $table->dropColumn('relation_type');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_rating', function($table)
        {
            $table->timestamp('deleted_at')->default(null);
            $table->string('relation_type', 191);
        });
    }
}
