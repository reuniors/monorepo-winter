<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocationOtherInformations extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_location_other_informations', function($table)
        {
            $table->smallInteger('show_in_list')->unsigned()->default(0);
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_location_other_informations', function($table)
        {
            $table->dropColumn('show_in_list');
        });
    }
}
