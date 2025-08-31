<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkRating extends Migration
{
    public function up()
    {
        Schema::create('reuniors_knk_rating', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('relation_type');
            $table->integer('grade');
            $table->string('rating_type');
            $table->bigInteger('counter')->default(1);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_knk_rating');
    }
}
