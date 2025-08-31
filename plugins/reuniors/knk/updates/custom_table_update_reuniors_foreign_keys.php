<?php namespace Reuniors\Knk\Updates;

use Illuminate\Database\Schema\Blueprint;
use Schema;
use Winter\Storm\Database\Updates\Migration;

class TableUpdateForeignKeys extends Migration
{
    public function up()
    {
        // Only add foreign keys if the tables exist
        if (Schema::hasTable('reuniors_knk_restaurant_menu_food_categories')) {
            Schema::table('reuniors_knk_restaurant_menu_food_categories', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_restaurant_menu_food_categories', 'food_category_id')) {
                    $table->foreign('food_category_id', 'knk_rmf_restaurant_menu_food_category_id')
                        ->references('id')
                        ->on('reuniors_knk_food_categories')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_restaurant_menu_food_categories', 'restaurant_menu_id')) {
                    $table->foreign('restaurant_menu_id', 'knk_rmf_food_categories_restaurant_menu_id')
                        ->references('id')
                        ->on('reuniors_knk_restaurant_menu')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_user_badges_history')) {
            Schema::table('reuniors_knk_user_badges_history', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_user_badges_history', 'user_id')) {
                    $table->foreign('user_id', 'knk_ubh_badge_history_user_id')
                        ->references('id')
                        ->on('users')
                        ->onDelete('cascade');
                }
                
                if (Schema::hasColumn('reuniors_knk_user_badges_history', 'location_badge_history_id') && 
                    Schema::hasTable('reuniors_knk_location_badges_history')) {
                    $table->foreign('location_badge_history_id', 'knk_ubh_users_badge_history_id')
                        ->references('id')
                        ->on('reuniors_knk_location_badges_history')
                        ->onDelete('cascade');
                }

                if (Schema::hasColumn('reuniors_knk_user_badges_history', 'location_id') && 
                    Schema::hasTable('reuniors_knk_locations')) {
                    $table->foreign('location_id', 'knk_llh_locations_location_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }

                if (Schema::hasColumn('reuniors_knk_user_badges_history', 'profile_id') && 
                    Schema::hasTable('reuniors_knk_location_video_review_profiles')) {
                    $table->foreign('profile_id', 'knk_lvr_profiles_profile_id')
                        ->references('id')
                        ->on('reuniors_knk_location_video_review_profiles')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_locations_restaurant_menu')) {
            Schema::table('reuniors_knk_locations_restaurant_menu', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_locations_restaurant_menu', 'location_id')) {
                    $table->foreign('location_id', 'knk_lrm_restaurant_menu_location_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_locations_restaurant_menu', 'restaurant_menu_id')) {
                    $table->foreign('restaurant_menu_id', 'knk_lrm_locations_restaurant_menu_id')
                        ->references('id')
                        ->on('reuniors_knk_restaurant_menu')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_location_related_locations')) {
            Schema::table('reuniors_knk_location_related_locations', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_location_related_locations', 'location_id')) {
                    $table->foreign('location_id', 'knk_lrl_related_location_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_location_related_locations', 'location_related_id')) {
                    $table->foreign('location_related_id', 'knk_lrl_locations_related_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_foods_food_addon_groups')) {
            Schema::table('reuniors_knk_foods_food_addon_groups', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_foods_food_addon_groups', 'food_id')) {
                    $table->foreign('food_id', 'knk_ffag_addon_groups_food_id')
                        ->references('id')
                        ->on('reuniors_knk_foods')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_foods_food_addon_groups', 'food_addon_group_id')) {
                    $table->foreign('food_addon_group_id', 'knk_ffag_foods_addon_groups_id')
                        ->references('id')
                        ->on('reuniors_knk_food_addon_groups')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_banners_locations')) {
            Schema::table('reuniors_knk_banners_locations', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_banners_locations', 'banner_id')) {
                    $table->foreign('banner_id', 'knk_bl_locations_banner_id')
                        ->references('id')
                        ->on('reuniors_knk_banners')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_banners_locations', 'location_id')) {
                    $table->foreign('location_id', 'knk_bl_banners_location_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_locations_tags')) {
            Schema::table('reuniors_knk_locations_tags', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_locations_tags', 'location_id')) {
                    $table->foreign('location_id', 'knk_lt_tags_location_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_locations_tags', 'tag_id')) {
                    $table->foreign('tag_id', 'knk_lt_locations_tag_id')
                        ->references('id')
                        ->on('reuniors_knk_tags')
                        ->onDelete('cascade');
                }
            });
        }

        if (Schema::hasTable('reuniors_knk_locations_categories')) {
            Schema::table('reuniors_knk_locations_categories', function($table)
            {
                if (Schema::hasColumn('reuniors_knk_locations_categories', 'location_id')) {
                    $table->foreign('location_id', 'knk_lc_categories_location_id')
                        ->references('id')
                        ->on('reuniors_knk_locations')
                        ->onDelete('cascade');
                }
                if (Schema::hasColumn('reuniors_knk_locations_categories', 'category_id')) {
                    $table->foreign('category_id', 'knk_lc_locations_category_id')
                        ->references('id')
                        ->on('reuniors_knk_categories')
                        ->onDelete('cascade');
                }
            });
        }
    }

    public function down() {}
}
