<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkCountry extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_country', function($table)
        {
            $table->string('slug', 191)->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_country', function($table)
        {
            $table->dropColumn('slug');
        });
    }
}
