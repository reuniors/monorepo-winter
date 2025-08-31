<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationVideoReviews extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_video_reviews', function($table)
        {
            $table->integer('location_id')->unsigned();

            $table->foreign('location_id', 'knk_lvr_locations_location_id')
                ->references('id')
                ->on('reuniors_knk_locations')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_video_reviews', function($table)
        {
            $table->dropColumn('location_id');
        });
    }
}
