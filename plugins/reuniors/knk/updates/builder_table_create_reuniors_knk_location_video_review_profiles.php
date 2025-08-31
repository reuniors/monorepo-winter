<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationVideoReviewProfiles extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_video_review_profiles', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('source');
            $table->string('username');
            $table->string('author_url')->nullable();
            $table->string('author_name')->nullable();
            $table->string('author_photo')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_video_review_profiles');
    }
}
