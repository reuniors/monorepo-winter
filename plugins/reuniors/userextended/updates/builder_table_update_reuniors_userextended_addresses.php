<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsUserextendedAddresses extends Migration
{
    public function up()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->string('street');
            $table->string('street_number');
            $table->string('floor');
            $table->string('apartment');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->dropColumn('street');
            $table->dropColumn('street_number');
            $table->dropColumn('floor');
            $table->dropColumn('apartment');
        });
    }
}
