<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProducts4 extends Migration
{
    public function up()
{
    Schema::table('reuniors_haljina_products', function($table)
    {
        $table->integer('currency_id')->unsigned();
    });
}

public function down()
{
    Schema::table('reuniors_haljina_products', function($table)
    {
        $table->dropColumn('currency_id');
    });
}
}
