<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class RunMigrations extends Command
{
    protected $name = 'reuniors:run-migrations';
    protected $signature = 'reuniors:run-migrations {--dry-run : Show what would be created without actually creating}';
    protected $description = 'Run base plugin migrations manually';

    public function handle()
    {
        $dryRun = $this->option('dry-run');
        
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No tables will be actually created');
        }

        $migrations = [
            'reuniors_base_countries' => $this->createCountriesTable(),
            'reuniors_base_cities' => $this->createCitiesTable(),
            'reuniors_base_tags' => $this->createTagsTable(),
            'reuniors_base_tag_groups' => $this->createTagGroupsTable(),
            'reuniors_base_qa_questions' => $this->createQaQuestionsTable(),
            'reuniors_base_translations' => $this->createTranslationsTable(),
            'reuniors_base_change_requests' => $this->createChangeRequestsTable(),
        ];

        foreach ($migrations as $tableName => $callback) {
            if (Schema::hasTable($tableName)) {
                $this->warn("Table {$tableName} already exists, skipping...");
                continue;
            }

            $this->info("Creating table: {$tableName}");
            
            if (!$dryRun) {
                try {
                    $callback();
                    $this->info("✓ Table {$tableName} created successfully");
                } catch (\Exception $e) {
                    $this->error("✗ Failed to create table {$tableName}: " . $e->getMessage());
                }
            } else {
                $this->line("Would create table: {$tableName}");
            }
        }

        if (!$dryRun) {
            $this->info('All migrations completed successfully!');
        } else {
            $this->info('Dry run completed. Use without --dry-run to actually create tables.');
        }
    }

    private function createCountriesTable()
    {
        return function() {
            Schema::create('reuniors_base_countries', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->timestamp('deleted_at')->nullable();
                $table->string('name', 191);
                $table->string('code', 5);
                $table->text('description');
                $table->smallInteger('active')->default(1);
            });
        };
    }

    private function createCitiesTable()
    {
        return function() {
            Schema::create('reuniors_base_cities', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->timestamp('deleted_at')->nullable();
                $table->string('name', 191);
                $table->unsignedInteger('country_id')->nullable();
                $table->smallInteger('has_regions')->default(0);
                $table->unsignedInteger('parent_city_id')->nullable();
                $table->text('description')->nullable();
                $table->string('slug', 191);
                $table->text('snippet')->nullable();
                $table->smallInteger('active')->default(1);
                $table->bigInteger('sort_order')->default(0);
                $table->string('title', 191);
                $table->text('metadata')->nullable();
                // Foreign keys will be added after table creation
            });
        };
    }

    private function createTagsTable()
    {
        return function() {
            Schema::create('reuniors_base_tags', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->string('name');
                $table->text('description')->nullable();
                $table->string('color')->nullable();
                $table->integer('tag_group_id')->unsigned()->nullable();
                $table->foreign('tag_group_id')->references('id')->on('reuniors_base_tag_groups')->onDelete('set null');
            });
        };
    }

    private function createTagGroupsTable()
    {
        return function() {
            Schema::create('reuniors_base_tag_groups', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->string('name');
                $table->text('description')->nullable();
                $table->string('type')->default('default');
                $table->integer('parent_id')->unsigned()->nullable();
                $table->foreign('parent_id')->references('id')->on('reuniors_base_tag_groups')->onDelete('set null');
            });
        };
    }

    private function createQaQuestionsTable()
    {
        return function() {
            Schema::create('reuniors_base_qa_questions', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->text('question');
                $table->text('answer')->nullable();
                $table->integer('order')->default(0);
            });
        };
    }

    private function createTranslationsTable()
    {
        return function() {
            Schema::create('reuniors_base_translations', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->string('entity_type');
                $table->integer('entity_id')->unsigned();
                $table->string('field_name');
                $table->string('language', 5);
                $table->text('value');
                $table->index(['entity_type', 'entity_id', 'field_name', 'language']);
            });
        };
    }

    private function createChangeRequestsTable()
    {
        return function() {
            Schema::create('reuniors_base_change_requests', function($table) {
                $table->engine = 'InnoDB';
                $table->increments('id')->unsigned();
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable();
                $table->string('entity_type');
                $table->integer('entity_id')->unsigned();
                $table->string('field_name');
                $table->text('old_value')->nullable();
                $table->text('new_value')->nullable();
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->integer('created_by')->unsigned()->nullable();
                $table->integer('approved_by')->unsigned()->nullable();
                $table->integer('rejected_by')->unsigned()->nullable();
                $table->text('rejection_reason')->nullable();
                $table->index(['entity_type', 'entity_id']);
                $table->index(['status']);
            });
        };
    }
}
