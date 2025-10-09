<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonViews extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_views', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('created_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_views_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            $table->foreign('user_id', 'fk_rb_person_views_user_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('user_id', 'idx_user_id');
            $table->index('ip_address', 'idx_ip_address');
            $table->index('created_at', 'idx_created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_views');
    }
}
