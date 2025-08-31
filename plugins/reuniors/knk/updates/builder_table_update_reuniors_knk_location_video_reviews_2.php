<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationVideoReviews2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_video_reviews', function($table)
        {
            $table->string('thumbnail_url', 2255)->change();
            $table->text('source_body')->nullable()->unsigned(false)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_location_video_reviews', function($table)
        {
            $table->string('thumbnail_url', 255)->change();
            $table->string('source_body', 255)->nullable()->unsigned(false)->default(null)->change();
        });
    }
}
