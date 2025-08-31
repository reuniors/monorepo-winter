<?php namespace Reuniors\Haljina\Console;

use Illuminate\Support\Str;
use Reuniors\Haljina\Models\Category;
use Winter\Storm\Console\Command;

class ImportSample extends Command
{
    /**
     * @var string The console command name.
     */
    protected static $defaultName = 'haljina:importsample';

    /**
     * @var string The name and signature of this command.
     */
    protected $signature = 'haljina:importsample
        {myCustomArgument : Example argument. <info>Additional information</info>}
        {--f|force : Force the operation to run and ignore production warnings and confirmation questions.}';

    /**
     * @var string The console command description.
     */
    protected $description = 'No description provided yet...';

    /**
     * Execute the console command.
     * @return void
     */
    public function handle()
    {
        $this->output->writeln('Start import');
        $this->importCategories();
        $this->output->writeln('End import');
    }

    public function importCategories()
    {
        $categoriesJson = '[
  {
    "id": 200,
    "name": "Haljine",
    "subcategories": [
      {
        "id": 201,
        "name": "Elegantne haljine"
      },
      {
        "id": 202,
        "name": "Haljine za plažu"
      },
      {
        "id": 203,
        "name": "Haljine za svaki dan"
      },
      {
        "id": 204,
        "name": "Pamučne haljine"
      },
      {
        "id": 205,
        "name": "Duge haljine"
      },
      {
        "id": 206,
        "name": "Kratke haljine"
      },
      {
        "id": 207,
        "name": "Uske haljine"
      },
      {
        "id": 208,
        "name": "Široke haljine"
      },
      {
        "id": 209,
        "name": "Haljine na top"
      },
      {
        "id": 210,
        "name": "Haljine sa čipkom"
      }
    ]
  },
  {
    "id": 100,
    "name": "Majice",
    "subcategories": [
      {
        "id": 101,
        "name": "Majice kratkih rukava"
      },
      {
        "id": 102,
        "name": "Trik majice"
      },
      {
        "id": 103,
        "name": "Majice sa karnerom"
      },
      {
        "id": 104,
        "name": "Topići"
      },
      {
        "id": 105,
        "name": "Majice sa čipkom"
      },
      {
        "id": 106,
        "name": "Bodi majice"
      }
    ]
  },
  {
    "id": 300,
    "name": "Bluze",
    "subcategories": []
  },
  {
    "id": 400,
    "name": "Košulje",
    "subcategories": []
  },
  {
    "id": 500,
    "name": "Elegantne majice",
    "subcategories": []
  },
  {
    "id": 600,
    "name": "Sportske majice",
    "subcategories": []
  },
  {
    "id": 700,
    "name": "Duksevi",
    "subcategories": []
  },
  {
    "id": 800,
    "name": "Sakoi",
    "subcategories": []
  },
  {
    "id": 900,
    "name": "Kaputi",
    "subcategories": [
      {
        "id": 901,
        "name": "Zimski kaputi"
      },
      {
        "id": 902,
        "name": "Prolećni kaputi"
      }
    ]
  },
  {
    "id": 1000,
    "name": "Jakne",
    "subcategories": [
      {
        "id": 1001,
        "name": "Kožne jakne"
      },
      {
        "id": 1002,
        "name": "Teksas jakne"
      },
      {
        "id": 1003,
        "name": "Zimske jakne"
      },
      {
        "id": 1004,
        "name": "Ljetnje jakne"
      }
    ]
  },
  {
    "id": 1100,
    "name": "Prsluci",
    "subcategories": []
  },
  {
    "id": 1200,
    "name": "Pantalone",
    "subcategories": []
  },
  {
    "id": 1300,
    "name": "Farmerice",
    "subcategories": []
  },
  {
    "id": 1400,
    "name": "Helanke",
    "subcategories": [
      {
        "id": 1401,
        "name": "Kožne helanke"
      },
      {
        "id": 1402,
        "name": "Sportske helanke"
      }
    ]
  },
  {
    "id": 1500,
    "name": "Ogrtači za plažu",
    "subcategories": []
  },
  {
    "id": 1600,
    "name": "Kupaći kostimi",
    "subcategories": []
  },
  {
    "id": 1700,
    "name": "Torbe",
    "subcategories": [
      {
        "id": 1701,
        "name": "Novčanici"
      },
      {
        "id": 1702,
        "name": "Neseseri"
      },
      {
        "id": 1703,
        "name": "Elegantne torbe"
      },
      {
        "id": 1704,
        "name": "Sportske torbe"
      }
    ]
  },
  {
    "id": 1800,
    "name": "Kombinezoni",
    "subcategories": []
  },
  {
    "id": 1900,
    "name": "Suknje",
    "subcategories": [
      {
        "id": 1901,
        "name": "Duge suknje"
      },
      {
        "id": 1902,
        "name": "Kratke suknje"
      }
    ]
  }
]';
        $categories = json_decode($categoriesJson, true);
        foreach ($categories as $category) {
            $categoryModel = new Category();
            $categoryModel->title = $category['name'];
            $categoryModel->name = Str::camel($category['name']);
            $categoryModel->slug = Str::slug($category['name']);
            $categoryModel->active = true;

            $categoryModel->save();

            foreach ($category['subcategories'] as $subcategory) {
                $subcategoryModel = new Category();
                $subcategoryModel->title = $subcategory['name'];
                $subcategoryModel->name = Str::camel($subcategory['name']);
                $subcategoryModel->slug = Str::slug($subcategory['name']);
                $subcategoryModel->active = true;

                $subcategoryModel->save();
                $subcategoryModel->makeChildOf($categoryModel);
            }
        }
    }

    /**
     * Provide autocomplete suggestions for the "myCustomArgument" argument
     */
    // public function suggestMyCustomArgumentValues(): array
    // {
    //     return ['value', 'another'];
    // }
}
