<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProducts3 extends Migration
{
    public function up()
{
    Schema::table('reuniors_haljina_products', function($table)
    {
        $table->integer('quantity')->unsigned()->default(1);
    });
}

public function down()
{
    Schema::table('reuniors_haljina_products', function($table)
    {
        $table->dropColumn('quantity');
    });
}
}
