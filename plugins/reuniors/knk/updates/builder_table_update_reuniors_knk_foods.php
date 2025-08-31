<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoods extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_food', 'reuniors_knk_foods');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_foods', 'reuniors_knk_food');
    }
}
