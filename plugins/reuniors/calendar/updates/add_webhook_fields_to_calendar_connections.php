<?php

use Winter\Storm\Database\Schema\Blueprint;
use Winter\Storm\Database\Updates\Migration;

class AddWebhookFieldsToCalendarConnections extends Migration
{
    public function up()
    {
        Schema::table('reuniors_calendar_connections', function (Blueprint $table) {
            $table->string('webhook_channel_id')->nullable()->after('token_expires_at');
            $table->string('webhook_resource_id')->nullable()->after('webhook_channel_id');
            $table->string('webhook_channel_token')->nullable()->after('webhook_resource_id');
            $table->timestamp('webhook_expires_at')->nullable()->after('webhook_channel_token');

            $table->index('webhook_channel_id');
        });
    }

    public function down()
    {
        Schema::table('reuniors_calendar_connections', function (Blueprint $table) {
            $table->dropIndex(['webhook_channel_id']);
            $table->dropColumn(['webhook_channel_id', 'webhook_resource_id', 'webhook_channel_token', 'webhook_expires_at']);
        });
    }
}

