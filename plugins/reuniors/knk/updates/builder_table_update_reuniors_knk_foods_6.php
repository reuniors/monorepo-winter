<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoods6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_foods', function($table)
        {
            $table->string('identifier')->nullable();
            $table->string('outsource_code')->nullable();
            $table->string('outsource', 2)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_foods', function($table)
        {
            $table->dropColumn('identifier');
            $table->dropColumn('outsource_code');
            $table->dropColumn('outsource');
        });
    }
}
