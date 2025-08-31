<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations12 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dateTime('deactivation_at')->nullable();
            $table->dateTime('closed_from_at')->nullable();
            $table->dateTime('closed_to_at')->nullable();
            $table->smallInteger('is_closed')->default(0);
            $table->renameColumn('activation_time', 'activation_at');
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->dropColumn('deactivation_at');
            $table->dropColumn('closed_from_at');
            $table->dropColumn('closed_to_at');
            $table->dropColumn('is_closed');
            $table->renameColumn('activation_at', 'activation_time');
        });
    }
}
