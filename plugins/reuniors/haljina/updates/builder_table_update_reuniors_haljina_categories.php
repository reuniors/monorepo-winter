<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaCategories extends Migration
{
    public function up()
{
    Schema::table('reuniors_haljina_categories', function($table)
    {
        $table->smallInteger('has_standard_attributes')->unsigned()->default(1);
    });
}

public function down()
{
    Schema::table('reuniors_haljina_categories', function($table)
    {
        $table->dropColumn('has_standard_attributes');
    });
}
}
