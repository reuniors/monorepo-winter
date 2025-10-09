<?php namespace Reuniors\Botovi\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateReuniorsBotoviPeople extends Migration
{
    public function up()
    {
        Schema::create('reuniors_botovi_people', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('first_name', 255);
            $table->string('last_name', 255);
            $table->integer('city_id')->unsigned();
            $table->integer('birth_city_id')->unsigned()->nullable();
            $table->text('address')->nullable();
            $table->string('jmbg', 13)->nullable()->unique();
            $table->text('parent_names')->nullable();
            $table->text('children_names')->nullable();
            $table->date('birth_date')->nullable();
            $table->integer('main_category_id')->unsigned();
            $table->enum('type', ['bot', 'cacija', 'neutral']);
            $table->enum('status', ['pending', 'approved', 'rejected', 'active', 'inactive'])->default('pending');
            $table->text('description')->nullable();
            $table->text('snippet')->nullable();
            $table->string('slug', 255)->unique();
            $table->boolean('active')->default(false);
            $table->datetime('active_at')->nullable();
            $table->datetime('deactivate_at')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->datetime('verification_date')->nullable();
            $table->text('verification_notes')->nullable();
            $table->text('metadata')->nullable();
            $table->text('other_data')->nullable();
            $table->text('social_media_data')->nullable();
            $table->text('contact_data')->nullable();
            $table->text('professional_data')->nullable();
            $table->text('criminal_record_data')->nullable();
            $table->text('family_data')->nullable();
            $table->text('education_data')->nullable();
            $table->text('health_data')->nullable();
            $table->text('financial_data')->nullable();
            $table->text('political_affiliation_data')->nullable();
            $table->text('public_opinion_data')->nullable();
            $table->text('media_mentions_data')->nullable();
            $table->text('events_data')->nullable();
            $table->text('relationships_data')->nullable();
            $table->text('tags_data')->nullable();
            $table->integer('created_by')->unsigned();
            $table->integer('approved_by')->unsigned()->nullable();
            $table->integer('rejected_by')->unsigned()->nullable();
            $table->text('rejection_reason')->nullable();
            $table->integer('last_updated_by')->unsigned()->nullable();
            $table->integer('priority_level')->default(0);
            $table->integer('risk_level')->default(0);
            $table->integer('influence_level')->default(0);
            $table->boolean('public_visibility')->default(true);
            $table->boolean('search_visibility')->default(true);
            $table->text('admin_notes')->nullable();
            $table->datetime('last_activity_at')->nullable();
            $table->integer('update_count')->default(0);
            $table->integer('view_count')->default(0);
            $table->integer('like_count')->default(0);
            $table->integer('dislike_count')->default(0);
            $table->integer('report_count')->default(0);
            $table->integer('flag_count')->default(0);
            $table->integer('reviews_count')->default(0);
            $table->decimal('rating_average', 3, 2)->default(0.00);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('deleted_at')->nullable();

            // Foreign keys
            $table->foreign('city_id', 'fk_rb_people_city_id')
                ->references('id')
                ->on('reuniors_base_cities')
                ->onDelete('cascade');

            $table->foreign('birth_city_id', 'fk_rb_people_birth_city_id')
                ->references('id')
                ->on('reuniors_base_cities')
                ->onDelete('set null');

            $table->foreign('main_category_id', 'fk_rb_people_main_category_id')
                ->references('id')
                ->on('reuniors_botovi_categories')
                ->onDelete('cascade');

            $table->foreign('created_by', 'fk_rb_people_created_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('approved_by', 'fk_rb_people_approved_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('rejected_by', 'fk_rb_people_rejected_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('last_updated_by', 'fk_rb_people_last_updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indexes
            $table->index('city_id', 'idx_city_id');
            $table->index('main_category_id', 'idx_main_category_id');
            $table->index('type', 'idx_type');
            $table->index('status', 'idx_status');
            $table->index('active', 'idx_active');
            $table->index('created_by', 'idx_created_by');
            $table->index('created_at', 'idx_created_at');
            $table->index('view_count', 'idx_view_count');
            $table->index('like_count', 'idx_like_count');
        });
    }

    public function down()
    {
        Schema::dropIfExists('reuniors_botovi_people');
    }
}
