<?php namespace Reuniors\Knk\Updates;

use Winter\Storm\Database\Updates\Migration;
use Winter\Storm\Support\Facades\Schema;

class BuilderTableCreateReuniorsKnkProfilesFollowers extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_profiles_followers', function($table)
        {
            $table->id();
            $table->integer('follower_user_id')->unsigned();
            $table->integer('profile_id')->unsigned();
            $table->timestamps();

            $table->foreign('follower_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('profile_id')
                ->references('id')
                ->on('reuniors_knk_profiles')
                ->onDelete('cascade');

            $table->unique(['follower_user_id', 'profile_id'], 'knk_pf_follower_profile_unique');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_profiles_followers');
    }
} 