<?php namespace Reuniors\Knk\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsKnkBanners4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_knk_banners', function($table)
        {
            $table->integer('city_id')->nullable()->unsigned();
            $table->integer('category_id')->nullable()->unsigned();
            $table->string('url', 10000);
            $table->dateTime('activation_at')->nullable();
            $table->dateTime('deactivation_at')->nullable();
        });
    }

    public function down()
    {
        Schema::table('reuniors_knk_banners', function($table)
        {
            $table->dropColumn('city_id');
            $table->dropColumn('category_id');
            $table->dropColumn('url');
            $table->dropColumn('activation_at');
            $table->dropColumn('deactivation_at');
        });
    }
}
