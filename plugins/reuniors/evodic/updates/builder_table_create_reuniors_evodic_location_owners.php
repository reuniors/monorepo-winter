<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsEvodicLocationOwners extends Migration
{
    public function up()
{
    Schema::create('reuniors_evodic_location_owners', function($table)
    {
        $table->engine = 'InnoDB';
        $table->increments('id')->unsigned();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
        $table->timestamp('deleted_at')->nullable();
        $table->string('first_name');
        $table->string('last_name');
        $table->integer('city_id')->nullable()->unsigned();
        $table->text('address_data')->nullable();
        $table->text('metadata')->nullable();
        $table->integer('user_id')->unsigned();
        $table->string('level');
        $table->string('status');
        $table->smallInteger('is_active')->unsigned();
    });
}

public function down()
{
    Schema::dropIfExists('reuniors_evodic_location_owners');
}
}
