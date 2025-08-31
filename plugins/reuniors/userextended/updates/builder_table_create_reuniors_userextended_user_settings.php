<?php namespace Reuniors\UserExtended\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsUserextendedUserSettings extends Migration
{
    public function up()
    {
        Schema::create('reuniors_userextended_user_settings', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->smallInteger('active')->unsigned()->default(0);
            $table->integer('user_id')->unsigned();
            $table->text('data')->nullable();
            $table->string('name');
    
            $table->foreign('user_id', 'userex_s_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_userextended_user_settings');
    }
}
