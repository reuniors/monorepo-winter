<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkTags13 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->string('icon')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_tags', function($table)
        {
            $table->dropColumn('icon');
        });
    }
}
