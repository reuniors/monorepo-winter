<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaProductAttributes2 extends Migration
{
    public function up()
{
    Schema::table('reuniors_haljina_product_attributes', function($table)
    {
        $table->smallInteger('is_standard')->unsigned()->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_haljina_product_attributes', function($table)
    {
        $table->dropColumn('is_standard');
    });
}
}
