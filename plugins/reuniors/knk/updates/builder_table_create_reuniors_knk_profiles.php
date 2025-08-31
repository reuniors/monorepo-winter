<?php namespace Reuniors\Knk\Updates;

use Winter\Storm\Database\Updates\Migration;
use Winter\Storm\Database\Schema\Blueprint;
use Winter\Storm\Support\Facades\Schema;

class BuilderTableCreateReuniorsKnkProfiles extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_profiles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('reviews_count')->default(0);
            $table->integer('likes_count')->default(0);
            $table->integer('followers_count')->default(0);
            $table->text('bio')->nullable();
            $table->string('instagram_username', 255)->nullable();
            $table->string('tiktok_username', 255)->nullable();
            $table->string('youtube_channel', 255)->nullable();
            $table->boolean('is_food_critic')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Pivot table for favorite food categories
        Schema::create('reuniors_knk_profiles_food_categories', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('profile_id')->unsigned();
            $table->integer('food_category_id')->unsigned();
            $table->timestamps();

            $table->foreign('profile_id')->references('id')->on('reuniors_knk_profiles')->onDelete('cascade');
            $table->foreign('food_category_id')->references('id')->on('reuniors_knk_food_categories')->onDelete('cascade');
            $table->primary(['profile_id', 'food_category_id']);
        });

        // Pivot table for favorite locations
        Schema::create('reuniors_knk_profiles_locations', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('profile_id')->unsigned();
            $table->integer('location_id')->unsigned();
            $table->timestamps();

            $table->foreign('profile_id')->references('id')->on('reuniors_knk_profiles')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('reuniors_knk_locations')->onDelete('cascade');
            $table->primary(['profile_id', 'location_id']);
        });

        // Pivot table for dietary restrictions (using tags)
        Schema::create('reuniors_knk_profiles_dietary_tags', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('profile_id')->unsigned();
            $table->integer('tag_id')->unsigned();
            $table->timestamps();

            $table->foreign('profile_id')->references('id')->on('reuniors_knk_profiles')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('reuniors_knk_tags')->onDelete('cascade');
            $table->primary(['profile_id', 'tag_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_profiles_dietary_tags');
        Schema::dropIfExists('reuniors_knk_profiles_locations');
        Schema::dropIfExists('reuniors_knk_profiles_food_categories');
        Schema::dropIfExists('reuniors_knk_profiles');
    }
} 