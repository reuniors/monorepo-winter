<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsUserextendedAddresses2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->string('notice', 1000);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->dropColumn('notice');
        });
    }
}
