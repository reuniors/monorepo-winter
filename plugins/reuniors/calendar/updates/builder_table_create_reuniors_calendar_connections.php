<?php namespace Reuniors\Calendar\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsCalendarConnections extends Migration
{
    public function up()
    {
        Schema::create('reuniors_calendar_connections', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('provider')->default('google'); // 'google' | 'apple' | 'outlook' | etc.
            $table->string('provider_calendar_id')->nullable();
            $table->string('provider_email');
            $table->text('access_token');
            $table->text('refresh_token')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->string('channel_id')->nullable(); // For webhooks
            $table->string('resource_id')->nullable(); // For webhooks
            $table->timestamp('webhook_expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('sync_to_provider')->default(true); // Our system → Provider
            $table->boolean('sync_from_provider')->default(true); // Provider → Our system
            $table->boolean('block_overlapping_slots')->default(true);
            $table->boolean('allow_overlapping_with_approval')->default(false);
            $table->text('settings')->nullable(); // JSON for provider-specific settings
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            
            $table->index(['provider', 'is_active']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('reuniors_calendar_connections');
    }
}

