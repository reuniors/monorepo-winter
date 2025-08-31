<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodCategories10 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->integer('tag_id')->nullable()->unsigned();
            $table->foreign('tag_id', 'knk_food_category_tags_tag_id')
                ->references('id')
                ->on('reuniors_knk_tags')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_food_categories', function($table)
        {
            $table->dropForeign('knk_food_category_tags_tag_id');
            $table->dropColumn('tag_id');
        });
    }
}
