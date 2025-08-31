<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProductAttributes extends Migration
{
    public function up()
{
    Schema::table('reuniors_haljina_product_attributes', function($table)
    {
        $table->integer('sort_order')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_haljina_product_attributes', function($table)
    {
        $table->dropColumn('sort_order');
    });
}
}
