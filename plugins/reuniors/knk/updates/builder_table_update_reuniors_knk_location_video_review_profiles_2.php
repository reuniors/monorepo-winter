<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationVideoReviewProfiles2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_video_review_profiles', function($table)
        {
            $table->string('author_photo', 2255)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_location_video_review_profiles', function($table)
        {
            $table->string('author_photo', 255)->change();
        });
    }
}
