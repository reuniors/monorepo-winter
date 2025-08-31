<?php namespace Reuniors\Knk\Updates;

use Illuminate\Database\Schema\Blueprint;
use Schema;
use Winter\Storm\Database\Updates\Migration;

class TableUpdateForeignKeysV2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_foods_food_addons', function($table)
        {
            $table->foreign('food_id', 'knk_ffa_food_food_id')
                ->references('id')
                ->on('reuniors_knk_foods')
                ->onDelete('cascade');
            $table->foreign('food_addon_id', 'knk_ffag_foods_addons_food_addon_id')
                ->references('id')
                ->on('reuniors_knk_food_addons')
                ->onDelete('cascade');
        });
    }

    public function down() {}
}
