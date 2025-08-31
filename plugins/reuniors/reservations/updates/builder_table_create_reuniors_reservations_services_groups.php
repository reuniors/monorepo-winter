<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsReservationsServicesGroups extends Migration
{
    public function up()
    {
        Schema::create('reuniors_reservations_services_groups', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('title');
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->integer('active')->unsigned()->default(1);
            $table->integer('type')->unsigned();
            $table->integer('sort_order')->unsigned();
            $table->smallInteger('required')->unsigned();
            $table->integer('min_selected')->nullable()->unsigned();
            $table->integer('max_selected')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_reservations_services_groups');
    }
}
