<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableDeleteReuniorsUserextendedUsersAddresses extends Migration
{
    public function up()
    {
        Schema::dropIfExists('reuniors_userextended_users_addresses');
    }
    
    public function down()
    {
        Schema::create('reuniors_userextended_users_addresses', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('user_id')->unsigned();
            $table->integer('address_id')->unsigned();
            $table->primary(['user_id','address_id']);
        });
    }
}
