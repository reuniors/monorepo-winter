<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkManufacturers extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_manufacturers', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('title', 191);
            $table->string('name', 191);
            $table->string('slug', 191);
            $table->smallInteger('active')->default(0);
            $table->bigInteger('sort_order')->unsigned()->default(0);
            $table->string('description');
            $table->text('text');
            $table->text('metadata')->nullable();
            $table->integer('city_id')->nullable()->unsigned();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_manufacturers');
    }
}
