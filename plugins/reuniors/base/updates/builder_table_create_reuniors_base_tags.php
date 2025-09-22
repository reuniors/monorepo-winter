<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseTags extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_tags', function($table)
        {
            $table->increments('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('color', 7)->nullable();
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_tags');
    }
}
