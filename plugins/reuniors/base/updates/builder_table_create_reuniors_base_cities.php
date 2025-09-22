<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseCities extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_cities', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->unsignedInteger('country_id')->nullable();
            $table->smallInteger('has_regions')->default(0);
            $table->unsignedInteger('parent_city_id')->nullable();
            $table->text('description')->nullable();
            $table->string('slug', 191);
            $table->text('snippet')->nullable();
            $table->smallInteger('active')->default(1);
            $table->bigInteger('sort_order')->default(0);
            $table->string('title', 191);
            $table->text('metadata')->nullable();
            $table->foreign('country_id')->references('id')->on('reuniors_base_countries')->onDelete('set null');
            $table->foreign('parent_city_id')->references('id')->on('reuniors_base_cities')->onDelete('set null');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_cities');
    }
}
