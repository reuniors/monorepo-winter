<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkFoodClasses extends Migration
{
    public function up()
    {
        Schema::rename('reuniors_knk_food_type_classes', 'reuniors_knk_food_classes');
    }

    public function down()
    {
        Schema::rename('reuniors_knk_food_classes', 'reuniors_knk_food_type_classes');
    }
}
