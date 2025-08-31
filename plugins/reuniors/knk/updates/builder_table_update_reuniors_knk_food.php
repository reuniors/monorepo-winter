<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFood extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_food_menu', 'reuniors_knk_food');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_food', 'reuniors_knk_food_menu');
    }
}
