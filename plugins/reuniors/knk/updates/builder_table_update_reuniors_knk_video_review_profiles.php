<?php
namespace Reuniors\Knk\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkVideoReviewProfiles extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_video_review_profiles', function ($table) {
            $table->integer('profile_id')->nullable()->unsigned();
            $table->foreign('profile_id', 'knk_vrp_profiles_profile_id')
                ->references('id')
                ->on('reuniors_knk_profiles')
                ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_video_review_profiles', function ($table) {
            $table->dropForeign('knk_vrp_profiles_profile_id');
            $table->dropColumn('profile_id');
        });
    }
}