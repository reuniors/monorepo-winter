<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationVideoReviewProfiles extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_video_review_profiles', function($table)
        {
            $table->string('author_url', 2255)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_location_video_review_profiles', function($table)
        {
            $table->string('author_url', 255)->change();
        });
    }
}
