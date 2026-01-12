<?php namespace Reuniors\Reservations\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;
use DB;

class BuilderTableMakeOriginalFieldsNullableReuniorsReservations extends Migration
{
    public function up()
    {
        // Make original fields nullable in working_hours table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_working_hours MODIFY COLUMN `time_from` time NULL');
        DB::statement('ALTER TABLE reuniors_reservations_working_hours MODIFY COLUMN `time_to` time NULL');

        // Make original fields nullable in location_workers_shifts table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_location_workers_shifts MODIFY COLUMN `date` date NULL');
        DB::statement('ALTER TABLE reuniors_reservations_location_workers_shifts MODIFY COLUMN `time_from` time NULL');
        DB::statement('ALTER TABLE reuniors_reservations_location_workers_shifts MODIFY COLUMN `time_to` time NULL');

        // Make original fields nullable in client_reservations table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_client_reservations MODIFY COLUMN `date` datetime NULL');

        // Make original fields nullable in location_worker_discounts table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_location_worker_discounts MODIFY COLUMN `date_from` date NULL');
        DB::statement('ALTER TABLE reuniors_reservations_location_worker_discounts MODIFY COLUMN `date_to` date NULL');

        // Make original fields nullable in news table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_news MODIFY COLUMN `activated_at` timestamp NULL');
        DB::statement('ALTER TABLE reuniors_reservations_news MODIFY COLUMN `deactivated_at` timestamp NULL');
    }
    
    public function down()
    {
        // Revert working_hours table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_working_hours MODIFY COLUMN `time_from` time NOT NULL');
        DB::statement('ALTER TABLE reuniors_reservations_working_hours MODIFY COLUMN `time_to` time NOT NULL');

        // Revert location_workers_shifts table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_location_workers_shifts MODIFY COLUMN `date` date NOT NULL');
        DB::statement('ALTER TABLE reuniors_reservations_location_workers_shifts MODIFY COLUMN `time_from` time NOT NULL');
        DB::statement('ALTER TABLE reuniors_reservations_location_workers_shifts MODIFY COLUMN `time_to` time NOT NULL');

        // Revert client_reservations table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_client_reservations MODIFY COLUMN `date` datetime NOT NULL');

        // Revert location_worker_discounts table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_location_worker_discounts MODIFY COLUMN `date_from` date NOT NULL');
        DB::statement('ALTER TABLE reuniors_reservations_location_worker_discounts MODIFY COLUMN `date_to` date NOT NULL');

        // Revert news table
        // Use raw SQL to avoid changing column type, only modify nullable constraint
        DB::statement('ALTER TABLE reuniors_reservations_news MODIFY COLUMN `activated_at` timestamp NOT NULL');
        DB::statement('ALTER TABLE reuniors_reservations_news MODIFY COLUMN `deactivated_at` timestamp NOT NULL');
    }
}
