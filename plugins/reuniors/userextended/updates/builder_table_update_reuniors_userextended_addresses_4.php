<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsUserextendedAddresses4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->string('floor', 255)->nullable()->change();
            $table->string('apartment', 255)->nullable()->change();
            $table->string('notice', 1000)->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->string('floor', 255)->nullable(false)->change();
            $table->string('apartment', 255)->nullable(false)->change();
            $table->string('notice', 1000)->nullable(false)->change();
        });
    }
}
