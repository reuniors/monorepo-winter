<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsKnkFoodMenu extends Migration
{
    public function up() { Schema::create('reuniors_knk_food_menu', function($table) { $table->engine = 'InnoDB'; $table->increments('id')->unsigned(); $table->timestamp('created_at')->nullable(); $table->timestamp('updated_at')->nullable(); $table->timestamp('deleted_at')->nullable(); $table->string('name'); $table->text('description')->nullable(); $table->text('text')->nullable(); $table->string('slug')->nullable(); $table->double('price', 10, 0); $table->double('discount', 10, 0); }); } public function down() { Schema::dropIfExists('reuniors_knk_food_menu'); }
}
