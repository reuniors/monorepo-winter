<?php namespace Reuniors\Haljina\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Reuniors\Haljina\Models\Category;

class GenerateCategoriesJson implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    protected function populateCategoryChildren(Category $category, array &$categoryData)
    {
        if ($category->children->isNotEmpty()) {
            $categoryData['subcategories'] = [];
        }
        foreach ($category->children as $child) {
            $newData = [
                'id' => $child->id,
                'name' => $child->title,
            ];
            $this->populateCategoryChildren($child, $newData);
            $categoryData['subcategories'][] = $newData;
        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $categories = Category::getNested();
        $categoriesPrepareData = [];
        foreach ($categories as $category) {
            $newCategoryData = [
                'id' => $category->id,
                'name' => $category->title,
            ];
            $this->populateCategoryChildren($category, $newCategoryData);
            $categoriesPrepareData[] = $newCategoryData;
        }
        $categoriesJson = json_encode($categoriesPrepareData);
        file_put_contents(storage_path('app/categories.json'), $categoriesJson);
    }
}
