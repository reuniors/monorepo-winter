<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationsTags extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations_tags', function($table) {
            $table->integer('tag_id')->nullable()->unsigned()->change();
        });
        Schema::table('reuniors_knk_locations_tags', function($table)
        {
            $table->foreign('tag_id', 'knk_locations_tags_tag_id')
                ->references('id')
                ->on('reuniors_knk_tags')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations_tags', function($table)
        {
            $table->dropColumn('food_id');
        });
    }
}
