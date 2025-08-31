<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicTags extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_tags', function($table)
        {
            $table->string('icon')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_tags', function($table)
        {
            $table->dropColumn('icon');
        });
    }
}
