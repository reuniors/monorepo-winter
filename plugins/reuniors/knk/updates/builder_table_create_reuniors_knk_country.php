<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkCountry extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_country', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('name', 191);
            $table->string('code', 5);
            $table->text('description');
            $table->smallInteger('active')->default(1);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_country');
    }
}
