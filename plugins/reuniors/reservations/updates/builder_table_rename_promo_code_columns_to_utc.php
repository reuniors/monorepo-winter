<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableRenamePromoCodeColumnsToUtc extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_promo_codes', function($table)
        {
            $table->renameColumn('activate_at', 'activate_at_utc');
            $table->renameColumn('deactivate_at', 'deactivate_at_utc');
        });
    }

    public function down()
    {
        Schema::table('reuniors_reservations_promo_codes', function($table)
        {
            $table->renameColumn('activate_at_utc', 'activate_at');
            $table->renameColumn('deactivate_at_utc', 'deactivate_at');
        });
    }
}
