<?php namespace Reuniors\Base\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableAddUtcFieldsReuniorsBaseChangeRequests extends Migration
{
    public function up()
    {
        Schema::table('reuniors_base_change_requests', function($table)
        {
            $table->date('scheduled_date_utc')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_base_change_requests', function($table)
        {
            $table->dropColumn('scheduled_date_utc');
        });
    }
}
