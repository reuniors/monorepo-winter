<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProducts5 extends Migration
{
    public function up()
{
    Schema::table('reuniors_haljina_products', function($table)
    {
        $table->integer('size_id')->nullable()->unsigned();
    });
}

public function down()
{
    Schema::table('reuniors_haljina_products', function($table)
    {
        $table->dropColumn('size_id');
    });
}
}
