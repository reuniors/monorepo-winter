<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsReservationsNews extends Migration
{
    public function up()
    {
        Schema::table('reuniors_reservations_news', function($table)
        {
            $table->timestamp('activated_at_utc')->nullable();
            $table->timestamp('deactivated_at_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_reservations_news', function($table)
        {
            $table->dropColumn([
                'activated_at_utc',
                'deactivated_at_utc'
            ]);
        });
    }
}
