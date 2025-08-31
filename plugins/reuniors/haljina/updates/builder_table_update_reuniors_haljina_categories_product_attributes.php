<?php namespace Reuniors\Haljina\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsHaljinaCategoriesProductAttributes extends Migration
{
    public function up()
{
    Schema::rename('reuniors_haljina_category_product_attributes', 'reuniors_haljina_categories_product_attributes');
}

public function down()
{
    Schema::rename('reuniors_haljina_categories_product_attributes', 'reuniors_haljina_category_product_attributes');
}
}
