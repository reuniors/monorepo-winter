<?php namespace Reuniors\Base\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableMakeOriginalFieldsNullableReuniorsBase extends Migration
{
    public function up()
    {
        // No original date/time fields to make nullable in change_requests table
        // The table only has scheduled_date_utc field, no original scheduled_date field
    }
    
    public function down()
    {
        // No changes to revert
    }
}
