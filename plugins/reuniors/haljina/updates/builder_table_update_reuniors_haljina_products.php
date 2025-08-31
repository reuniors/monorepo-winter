<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProducts extends Migration
{
    public function up()
    {
        Schema::table('reuniors_haljina_products', function($table)
        {
            $table->integer('category_id')->unsigned();
            $table->integer('user_id')->unsigned()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_haljina_products', function($table)
        {
            $table->dropColumn('category_id');
            $table->integer('user_id')->unsigned(false)->change();
        });
    }
}
