<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkBanner extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_banner', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->integer('banner_zone_id')->nullable()->unsigned();
            $table->string('name', 191);
            $table->text('text');
            $table->text('metadata')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_banner');
    }
}
