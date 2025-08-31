<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->text('phone_data')->nullable()->change();
            $table->smallInteger('is_closed')->nullable()->change();
            $table->double('address_lat', 10, 0)->nullable()->change();
            $table->double('address_long', 10, 0)->nullable()->change();
            $table->string('website_url', 255)->nullable()->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->text('phone_data')->nullable(false)->change();
            $table->smallInteger('is_closed')->nullable(false)->change();
            $table->double('address_lat', 10, 0)->nullable(false)->change();
            $table->double('address_long', 10, 0)->nullable(false)->change();
            $table->string('website_url', 255)->nullable(false)->change();
        });
    }
}
