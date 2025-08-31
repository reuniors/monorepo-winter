<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkRegionCity extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_region_city', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->integer('country_id')->unsigned();
            $table->smallInteger('has_regions')->default(0);
            $table->integer('region_id')->nullable();
            $table->text('description')->nullable();
            $table->string('slug', 191);
            $table->text('snippet')->nullable();
            $table->smallInteger('active')->default(1);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_region_city');
    }
}
