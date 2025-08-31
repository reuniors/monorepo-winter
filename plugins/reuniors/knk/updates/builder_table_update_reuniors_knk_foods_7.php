<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoods7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_foods', function($table)
        {
            $table->string('barcode')->nullable();
            $table->smallInteger('has_prices')->default(0);
            $table->smallInteger('has_addons')->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_foods', function($table)
        {
            $table->dropColumn('barcode');
            $table->dropColumn('has_prices');
            $table->dropColumn('has_addons');
        });
    }
}
