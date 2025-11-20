<?php namespace Reuniors\Base\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseConnectedDevices extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_connected_devices', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->text('tokens');
            $table->integer('user_id')->unsigned();
            $table->string('location_slug')->nullable();

            $table->foreign('user_id', 'base_cd_user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->references('id')
                ->on('users');

            // Index on location_slug (no FK to avoid dependency on other plugins)
            $table->index('location_slug', 'base_cd_location_slug_idx');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_base_connected_devices');
    }
}

