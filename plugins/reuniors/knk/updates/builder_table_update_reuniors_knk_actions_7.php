<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkActions7 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->integer('attach_to_id')->nullable();
            $table->string('attach_to_type')->nullable();
            $table->string('attach_to_relation_name')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_actions', function($table)
        {
            $table->dropColumn('attach_to_id');
            $table->dropColumn('attach_to_type');
            $table->dropColumn('attach_to_relation_name');
        });
    }
}
