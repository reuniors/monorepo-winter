<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicPlaces8 extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->double('google_rating', 10, 0)->nullable();
        $table->double('price_from', 10, 0)->nullable();
        $table->double('price_to', 10, 0)->nullable();
        $table->integer('price_currency')->nullable()->default(0);
        $table->string('knk_slug')->nullable();
        $table->text('extra_data_other')->nullable();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_places', function($table)
    {
        $table->dropColumn('google_rating');
        $table->dropColumn('price_from');
        $table->dropColumn('price_to');
        $table->dropColumn('price_currency');
        $table->dropColumn('knk_slug');
        $table->dropColumn('extra_data_other');
    });
}
}
