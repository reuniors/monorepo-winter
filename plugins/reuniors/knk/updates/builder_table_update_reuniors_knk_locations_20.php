<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkLocations20 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {
            $table->foreign('city_id', 'knk_l_cities_city_id')->references('id')->on('reuniors_knk_region_city')->onDelete('restrict');
    
            $table->index(['active', 'is_closed']);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_knk_locations', function($table)
        {        
            $table->dropForeign(['city_id']);
    
            $table->dropIndex(['active', 'is_closed']);
        });
    }
}
