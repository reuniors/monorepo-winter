<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProducts2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_haljina_products', function($table)
        {
            $table->string('size')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_haljina_products', function($table)
        {
            $table->dropColumn('size');
        });
    }
}
