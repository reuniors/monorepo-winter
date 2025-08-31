<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationVideoReviewImages extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_video_review_images', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('video_review_id')->unsigned();
            $table->mediumText('thumbnail_base64')->charset('binary');
            $table->primary(['video_review_id']);
            
            $table->foreign('video_review_id', 'knk_vri_video_reviews_video_review_id')
                ->references('id')
                ->on('reuniors_knk_location_video_reviews')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_video_review_images');
    }
}
