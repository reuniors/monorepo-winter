<?php namespace Reuniors\Base\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateReuniorsBaseTranslations extends Migration
{
    public function up()
    {
        Schema::create('reuniors_base_translations', function($table)
        {
            $table->increments('id');
            $table->string('entity_type');
            $table->unsignedInteger('entity_id');
            $table->string('field_name');
            $table->string('language', 5);
            $table->text('value');
            $table->timestamps();
            
            $table->index(['entity_type', 'entity_id']);
            $table->index('language');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_base_translations');
    }
}
