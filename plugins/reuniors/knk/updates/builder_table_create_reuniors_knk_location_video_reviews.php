<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationVideoReviews extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_video_reviews', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('source');
            $table->integer('profile_id')->nullable()->unsigned();
            $table->string('thumbnail_url')->nullable();
            $table->integer('thumbnail_width')->nullable();
            $table->integer('thumbnail_height')->nullable();
            $table->string('source_eid')->nullable();
            $table->string('source_url');
            $table->string('source_body')->nullable();
            
            $table->foreign('profile_id', 'knk_lvr_profiles_profile_id')
                ->references('id')
                ->on('reuniors_knk_location_video_review_profiles')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_video_reviews');
    }
}
