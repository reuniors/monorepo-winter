<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsUserextendedUsersAddresses extends Migration
{
    public function up()
    {
        Schema::create('reuniors_userextended_users_addresses', function($table)
        {
            $table->engine = 'InnoDB';
            $table->integer('user_id')->unsigned();
            $table->integer('address_id')->unsigned();
            $table->primary(['user_id','address_id']);
            
            $table->foreign('user_id', 'reuniors_userex_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
                
            $table->foreign('address_id', 'reuniors_userex_address_id')
                ->references('id')
                ->on('reuniors_userextended_addresses')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_userextended_users_addresses');
    }
}
