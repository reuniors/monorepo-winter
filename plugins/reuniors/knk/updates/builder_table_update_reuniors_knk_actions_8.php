<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActions8 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->integer('restaurant_menu_id')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->dropColumn('restaurant_menu_id');
        });
    }
}
