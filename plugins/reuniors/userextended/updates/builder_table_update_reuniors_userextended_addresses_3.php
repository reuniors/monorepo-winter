<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsUserextendedAddresses3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->integer('user_id')->unsigned();
            
            $table->foreign('user_id', 'userex_a_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_userextended_addresses', function($table)
        {
            $table->dropColumn('user_id');
        });
    }
}
