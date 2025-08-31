<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkCountry2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_country', function($table)
        {
            $table->text('description')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_country', function($table)
        {
            $table->text('description')->nullable(false)->change();
        });
    }
}
