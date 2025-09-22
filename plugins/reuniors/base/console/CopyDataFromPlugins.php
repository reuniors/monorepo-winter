<?php namespace Reuniors\Base\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Reuniors\Base\Models\Country;
use Reuniors\Base\Models\City;
use Reuniors\Base\Models\Tag;
use Reuniors\Base\Models\TagGroup;
use Reuniors\Base\Models\QaQuestion;

class CopyDataFromPlugins extends Command
{
    protected $name = 'reuniors:copy-data';
    protected $signature = 'reuniors:copy-data {plugin} {--dry-run : Show what would be copied without actually copying} {--use-generic : Use generic table migrator}';
    protected $description = 'Copy data from plugin tables to base tables';

    public function handle()
    {
        $plugin = $this->argument('plugin');
        $dryRun = $this->option('dry-run');
        $useGeneric = $this->option('use-generic');

        if (!in_array($plugin, ['evodic', 'knk', 'rzr', 'haljina'])) {
            $this->error('Invalid plugin. Must be one of: evodic, knk, rzr, haljina');
            return 1;
        }

        $this->info("Copying data from {$plugin} plugin to base tables...");
        if ($dryRun) {
            $this->warn('DRY RUN MODE - No data will be actually copied');
        }

        try {
            if ($useGeneric) {
                $this->migrateWithGeneric($plugin, $dryRun);
            } else {
                $this->copyCountries($plugin, $dryRun);
                $this->copyCities($plugin, $dryRun);
                $this->copyTagGroups($plugin, $dryRun);
                $this->copyTags($plugin, $dryRun);
                $this->copyQaQuestions($plugin, $dryRun);
            }

            $this->info('Data copy completed successfully!');
            return 0;
        } catch (\Exception $e) {
            $this->error('Error copying data: ' . $e->getMessage());
            return 1;
        }
    }

    private function migrateWithGeneric($plugin, $dryRun)
    {
        $migrations = [
            [
                'source' => $plugin === 'knk' ? "reuniors_{$plugin}_country" : "reuniors_{$plugin}_countries",
                'target' => 'reuniors_base_countries',
                'description' => 'Countries'
            ],
            [
                'source' => $plugin === 'knk' ? "reuniors_{$plugin}_region_city" : "reuniors_{$plugin}_cities", 
                'target' => 'reuniors_base_cities',
                'description' => 'Cities'
            ],
            [
                'source' => "reuniors_{$plugin}_tag_groups",
                'target' => 'reuniors_base_tag_groups', 
                'description' => 'Tag Groups'
            ],
            [
                'source' => "reuniors_{$plugin}_tags",
                'target' => 'reuniors_base_tags',
                'description' => 'Tags'
            ],
            [
                'source' => "reuniors_{$plugin}_qa_questions",
                'target' => 'reuniors_base_qa_questions',
                'description' => 'QA Questions'
            ]
        ];

        foreach ($migrations as $migration) {
            $this->info("\nMigrating {$migration['description']}...");
            
            $command = "reuniors:migrate-table {$migration['source']} {$migration['target']}";
            if ($dryRun) {
                $command .= ' --dry-run';
            }

            $this->call('reuniors:migrate-table', [
                'source_table' => $migration['source'],
                'target_table' => $migration['target'],
                '--dry-run' => $dryRun
            ]);
        }
    }

    private function copyCountries($plugin, $dryRun)
    {
        $sourceTable = "reuniors_{$plugin}_countries";
        
        if (!DB::getSchemaBuilder()->hasTable($sourceTable)) {
            $this->warn("Table {$sourceTable} does not exist, skipping...");
            return;
        }

        $countries = DB::table($sourceTable)->get();
        $this->info("Found " . $countries->count() . " countries to copy");

        if ($dryRun) {
            foreach ($countries as $country) {
                $this->line("Would copy country: {$country->name} (ID: {$country->id})");
            }
            return;
        }

        $copied = 0;
        foreach ($countries as $country) {
            // Check if country already exists in base table
            $existing = Country::where('name', $country->name)->first();
            if ($existing) {
                $this->warn("Country '{$country->name}' already exists, skipping...");
                continue;
            }

            // Handle different table structures
            $countryData = [
                'name' => $country->name,
                'created_at' => $country->created_at,
                'updated_at' => $country->updated_at,
            ];

            // Add optional fields based on what exists in source table
            if (isset($country->code)) {
                $countryData['code'] = $country->code;
            }
            if (isset($country->flag)) {
                $countryData['flag'] = $country->flag;
            }

            Country::create($countryData);
            $copied++;
        }

        $this->info("Copied {$copied} countries");
    }

    private function copyCities($plugin, $dryRun)
    {
        $sourceTable = "reuniors_{$plugin}_cities";
        
        if (!DB::getSchemaBuilder()->hasTable($sourceTable)) {
            $this->warn("Table {$sourceTable} does not exist, skipping...");
            return;
        }

        $cities = DB::table($sourceTable)->get();
        $this->info("Found " . $cities->count() . " cities to copy");

        if ($dryRun) {
            foreach ($cities as $city) {
                $this->line("Would copy city: {$city->name} (ID: {$city->id}, Country ID: {$city->country_id})");
            }
            return;
        }

        $copied = 0;
        foreach ($cities as $city) {
            // Find the corresponding country in base table
            $sourceCountry = DB::table("reuniors_{$plugin}_countries")->where('id', $city->country_id)->first();
            if (!$sourceCountry) {
                $this->warn("Country not found for city '{$city->name}', skipping...");
                continue;
            }

            $baseCountry = Country::where('name', $sourceCountry->name)->first();
            if (!$baseCountry) {
                $this->warn("Base country not found for city '{$city->name}', skipping...");
                continue;
            }

            // Check if city already exists
            $existing = City::where('name', $city->name)
                ->where('country_id', $baseCountry->id)
                ->first();
            if ($existing) {
                $this->warn("City '{$city->name}' already exists, skipping...");
                continue;
            }

            City::create([
                'name' => $city->name,
                'country_id' => $baseCountry->id,
                'created_at' => $city->created_at,
                'updated_at' => $city->updated_at,
            ]);
            $copied++;
        }

        $this->info("Copied {$copied} cities");
    }

    private function copyTagGroups($plugin, $dryRun)
    {
        $sourceTable = "reuniors_{$plugin}_tag_groups";
        
        if (!DB::getSchemaBuilder()->hasTable($sourceTable)) {
            $this->warn("Table {$sourceTable} does not exist, skipping...");
            return;
        }

        $tagGroups = DB::table($sourceTable)->get();
        $this->info("Found " . $tagGroups->count() . " tag groups to copy");

        if ($dryRun) {
            foreach ($tagGroups as $tagGroup) {
                $this->line("Would copy tag group: {$tagGroup->name} (ID: {$tagGroup->id})");
            }
            return;
        }

        $copied = 0;
        foreach ($tagGroups as $tagGroup) {
            // Check if tag group already exists
            $existing = TagGroup::where('name', $tagGroup->name)->first();
            if ($existing) {
                $this->warn("Tag group '{$tagGroup->name}' already exists, skipping...");
                continue;
            }

            TagGroup::create([
                'name' => $tagGroup->name,
                'description' => $tagGroup->description ?? null,
                'type' => $tagGroup->type ?? 'default',
                'created_at' => $tagGroup->created_at,
                'updated_at' => $tagGroup->updated_at,
            ]);
            $copied++;
        }

        $this->info("Copied {$copied} tag groups");
    }

    private function copyTags($plugin, $dryRun)
    {
        $sourceTable = "reuniors_{$plugin}_tags";
        
        if (!DB::getSchemaBuilder()->hasTable($sourceTable)) {
            $this->warn("Table {$sourceTable} does not exist, skipping...");
            return;
        }

        $tags = DB::table($sourceTable)->get();
        $this->info("Found " . $tags->count() . " tags to copy");

        if ($dryRun) {
            foreach ($tags as $tag) {
                $tagGroupInfo = isset($tag->tag_group_id) ? "Tag Group ID: {$tag->tag_group_id}" : "No tag group";
                $this->line("Would copy tag: {$tag->name} (ID: {$tag->id}, {$tagGroupInfo})");
            }
            return;
        }

        $copied = 0;
        foreach ($tags as $tag) {
            $baseTagGroup = null;
            
            // Handle tag groups if they exist
            if (isset($tag->tag_group_id) && $tag->tag_group_id) {
                $sourceTagGroup = DB::table("reuniors_{$plugin}_tag_groups")->where('id', $tag->tag_group_id)->first();
                if ($sourceTagGroup) {
                    $baseTagGroup = TagGroup::where('name', $sourceTagGroup->name)->first();
                    if (!$baseTagGroup) {
                        $this->warn("Base tag group not found for tag '{$tag->name}', skipping...");
                        continue;
                    }
                }
            }

            // Check if tag already exists
            $existing = Tag::where('name', $tag->name);
            if ($baseTagGroup) {
                $existing->where('tag_group_id', $baseTagGroup->id);
            } else {
                $existing->whereNull('tag_group_id');
            }
            
            if ($existing->first()) {
                $this->warn("Tag '{$tag->name}' already exists, skipping...");
                continue;
            }

            // Handle different table structures
            $tagData = [
                'name' => $tag->name,
                'created_at' => $tag->created_at,
                'updated_at' => $tag->updated_at,
            ];

            // Add optional fields based on what exists in source table
            if (isset($tag->description)) {
                $tagData['description'] = $tag->description;
            }
            if (isset($tag->color)) {
                $tagData['color'] = $tag->color;
            }
            if ($baseTagGroup) {
                $tagData['tag_group_id'] = $baseTagGroup->id;
            }

            Tag::create($tagData);
            $copied++;
        }

        $this->info("Copied {$copied} tags");
    }

    private function copyQaQuestions($plugin, $dryRun)
    {
        $sourceTable = "reuniors_{$plugin}_qa_questions";
        
        if (!DB::getSchemaBuilder()->hasTable($sourceTable)) {
            $this->warn("Table {$sourceTable} does not exist, skipping...");
            return;
        }

        $questions = DB::table($sourceTable)->get();
        $this->info("Found " . $questions->count() . " QA questions to copy");

        if ($dryRun) {
            foreach ($questions as $question) {
                $this->line("Would copy QA question: {$question->question} (ID: {$question->id})");
            }
            return;
        }

        $copied = 0;
        foreach ($questions as $question) {
            // Check if question already exists
            $existing = QaQuestion::where('question', $question->question)->first();
            if ($existing) {
                $this->warn("QA question '{$question->question}' already exists, skipping...");
                continue;
            }

            QaQuestion::create([
                'question' => $question->question,
                'answer' => $question->answer ?? null,
                'order' => $question->order ?? 0,
                'created_at' => $question->created_at,
                'updated_at' => $question->updated_at,
            ]);
            $copied++;
        }

        $this->info("Copied {$copied} QA questions");
    }
}
