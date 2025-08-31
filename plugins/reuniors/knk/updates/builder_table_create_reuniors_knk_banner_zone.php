<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkBannerZone extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_banner_zone', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->text('name');
            $table->integer('category_id')->nullable()->unsigned();
            $table->string('slug', 191)->nullable();
            $table->string('url')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_banner_zone');
    }
}
