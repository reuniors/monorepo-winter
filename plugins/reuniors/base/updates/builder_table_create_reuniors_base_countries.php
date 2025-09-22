<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseCountries extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_countries', function($table)
        {
            $table->increments('id');
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
        Schema::dropIfExists('reuniors_base_countries');
    }
}
