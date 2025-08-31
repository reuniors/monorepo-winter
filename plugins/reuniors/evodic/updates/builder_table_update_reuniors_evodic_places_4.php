<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->text('address_data');
            $table->text('phone_data');
            $table->smallInteger('is_closed')->default(0);
            $table->string('snippet', 10000)->nullable();
            $table->integer('price_grade')->nullable();
            $table->double('address_lat', 10, 0);
            $table->double('address_long', 10, 0);
            $table->string('website_url');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_evodic_places', function($table)
        {
            $table->dropColumn('address_data');
            $table->dropColumn('phone_data');
            $table->dropColumn('is_closed');
            $table->dropColumn('snippet');
            $table->dropColumn('price_grade');
            $table->dropColumn('address_lat');
            $table->dropColumn('address_long');
            $table->dropColumn('website_url');
        });
    }
}
