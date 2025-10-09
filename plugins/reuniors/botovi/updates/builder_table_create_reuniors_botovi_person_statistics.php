<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPersonStatistics extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_person_statistics', function($table)
        {
            $table->engine = 'InnoDB';
            $table->uuid('id')->primary();
            $table->integer('person_id')->unsigned();
            $table->date('date');
            $table->integer('views_count')->default(0);
            $table->integer('likes_count')->default(0);
            $table->integer('dislikes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->integer('reviews_count')->default(0);
            $table->integer('flags_count')->default(0);
            $table->integer('reports_count')->default(0);
            $table->integer('shares_count')->default(0);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            // Foreign keys
            $table->foreign('person_id', 'fk_rb_person_statistics_person_id')
                ->references('id')
                ->on('reuniors_botovi_people')
                ->onDelete('cascade');

            // Indexes
            $table->index('person_id', 'idx_person_id');
            $table->index('date', 'idx_date');
            $table->index('created_at', 'idx_created_at');

            // Unique constraint
            $table->unique(['person_id', 'date'], 'unique_person_date_statistics');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_person_statistics');
    }
}
