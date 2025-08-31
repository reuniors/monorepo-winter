<?php namespace Reuniors\Knk\Updates;

use Illuminate\Support\Facades\Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkLocationLikesHistory extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_location_likes_history', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id');
            $table->integer('user_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->primary(['id']);

            $table->foreign('user_id', 'knk_llhl_users_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
            $table->foreign('location_id', 'knk_llhl_locations_location_id')
                ->references('id')
                ->on('reuniors_knk_locations')
                ->onDelete('cascade');
            $table->foreign('city_id', 'knk_llhl_region_city_city_id')
                ->references('id')
                ->on('reuniors_knk_region_city')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_location_likes_history');
    }
}
