<?php namespace Reuniors\Knk\Models;

use DB;
use Hybridauth\Data\Collection;
use October\Rain\Database\Traits\Sortable;
use Reuniors\Knk\Classes\S;
use Reuniors\Knk\ModelExtenders\ModelActionDataExtender;
use Reuniors\Knk\Models\Action\ActionData;
use Reuniors\Knk\Models\FileImage\FileImageSquare;

/**
 * Model
 * @property Collection|FoodAddon[] food_size_prices_by_id
 */
class Food extends MariaDbBase
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\SoftDelete;
    use Sortable;
    use ModelActionDataExtender;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    protected $jsonable = ['metadata', 'metadata_t', 'food_options'];

    public $implement = ['RainLab.Translate.Behaviors.TranslatableModel'];
    public $translatable = [
        'description',
        'title',
        'metadata_t',
        'food_options',
        ['slug', 'index' => true]
    ];

    public $fillable = [
        'name',
        'title',
        'slug',
        'text',
        'description',
        'active',
        'food_category_id',
        'sort_order',
        'has_prices',
        'has_addons',
        'price',
    ];

    public $food_category_id_inject;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_foods';

    /**
     * @var array Validation rules
     */
    public $rules = [

    ];

    public $appends = ['food_size_prices_by_id'];

    public $attachOne = [
        'food_image' => [
            FileImageSquare::class,
            'order' => 'sort_order',
            'delete' => true
        ],
    ];

    public $belongsTo = [
        'food_category' => ['Reuniors\Knk\Models\FoodCategory', 'order' => 'name'],
        'tag' => ['Reuniors\Knk\Models\Tag', 'order' => 'name'],
        'manufacturer' => ['Reuniors\Knk\Models\Manufacturer', 'order' => 'sort_order'],
    ];

    public $hasMany = [
        'likes_history' => [
            'Reuniors\Knk\Models\FoodLikeHistory',
            'delete' => true
        ],
    ];

    public $hasOne = [
        'user_like_history' => [
            'Reuniors\Knk\Models\FoodLikeHistory',
            'scope' => 'isUser'
        ],
    ];

    public $belongsToMany = [
        'food_addon_groups' => [
            'Reuniors\Knk\Models\FoodAddonGroup',
            'table' => 'reuniors_knk_foods_food_addon_groups',
            'pivot' => ['active'],
            'order' => 'sort_order',
            'delete' => true,
        ],
        'food_size_prices' => [
            'Reuniors\Knk\Models\FoodAddon',
            'table' => 'reuniors_knk_foods_food_addons',
            'pivot' => ['overridden_price'],
            'delete' => true,
        ],
        'locations' => [
            'Reuniors\Knk\Models\Location',
            'table' => 'reuniors_knk_locations_foods',
            'order' => 'sort_order',
        ],
    ];

    public function getFoodSizePricesByIdAttribute()
    {
        return $this->relationLoaded('food_size_prices')
            ? $this->food_size_prices->keyBy('id')
            : null;
    }

    public function scopeGetFE($query, $options)
    {
        /**
         * @var $id
         * @var $withFoodAddons
         * @var $withFoodCategories
         * @var $withFoodTypePrices
         * @var $withFoodImage
         */
        extract(array_merge([
            'id'          => null,
            'withFoodAddons' => null,
            'withFoodCategories' => null,
            'withFoodTypePrices' => null,
            'withFoodImage' => null,
        ], $options));
        if ($id !== null) {
            $query->where('id', $id);
        }
        if ($withFoodAddons !== null) {
            $query->with([
                'food_addon_groups',
            ]);
            if ($id !== null) {
                $query->with(['food_addon_groups.food_addons' => function ($query) use ($id) {
                    $query
                        ->select('reuniors_knk_food_addons.*', 'fa_price.overridden_price')
                        ->leftJoin('reuniors_knk_foods_food_addons AS fa_price', function($join) use ($id) {
                            $join->on('id', '=', 'fa_price.food_addon_id');
                            $join->on('fa_price.food_id', DB::raw($id));
                        });
                }]);
            } else {
                $query->with([
                    'food_addon_groups.food_addons',
                ]);
            }
        }
        if ($withFoodCategories !== null) {
            $query->with('food_category');
        }
        if ($withFoodImage !== null) {
            $query->with('food_image');
        }
    }

    public function afterSave()
    {
        $postData = post('Food');
        $tagName = isset($postData['_tag_name']) ? $postData['_tag_name'] : null;
        if (!$this->tag_id && !empty($tagName)) {
            $tagSlug = S::slug($tagName);
            $this->attachTagBySlug($tagSlug, $tagName);
        }
    }

    public function attachTagBySlug($tagSlug, $tagTitle)
    {
        $tagFixedData = Tag::tagFixSlugNameTitle($tagSlug);
        if ($tagFixedData) {
            $tagSlug = $tagFixedData['slug'];
            $tagTitle = $tagFixedData['title'];
        }
        $tagData = Tag::where('slug', $tagSlug)->first();
        if (empty($tagData)) {
            $tagData = new Tag();
            $tagGroup = TagGroup::where('name', 'foods')->first();
            if (!empty($tagGroup)) {
                $tagData->tag_group_id = $tagGroup->id;
            }
            $tagData->name = S::camel($tagTitle);
            $tagData->slug = $tagSlug;
            $tagData->title = $tagTitle;
            $tagData->save();
        }
        $this->tag_id = $tagData->id;
        $this->save();
    }

    public function setActionData(array $data, $actionType = null)
    {
        $this->actionData = (new ActionData())
            ->addToDataMapper('title')
            ->addToDataMapper('name')
            ->addToDataMapper('slug')
            ->addToDataMapper('active')
            ->addToDataMapper('price')
            ->addToDataMapper('text')
            ->addToDataMapper('description')
            ->addToDataMapper('has_prices')
            ->addToDataMapper('has_addons')
            ->setData($data);
    }

    public static function populateAddonPrices(self $food)
    {
        if (!$food->food_size_prices_by_id || $food->food_size_prices_by_id->isEmpty()) {
            return;
        }
        $food->food_addon_groups->each(function ($addonGroup, $groupKey) use ($food) {
            /** @var FoodAddonGroup $addonGroup */
            $addonGroupClone = clone $addonGroup;
            $addonGroup->food_addons->each(function ($addon, $index) use ($food, $addonGroupClone, $groupKey) {
                /** @var FoodAddon $addon */
                if (isset($food->food_size_prices_by_id[$addon->id])) {
                    $addonClone = clone $addon;
                    $addonClone->realPrice = $food->food_size_prices_by_id
                    [$addon->id]
                    ['pivot']
                    ['overridden_price'];
                    $addonGroupClone->food_addons[$index] = $addonClone;
                    $food->food_addon_groups[$groupKey] = $addonGroupClone;
                }
            });
        });
    }

    public function setPivotActionData(array $pivotData, $attachToRelationName, $attachToId)
    {
        // TODO: Implement setPivotActionData() method.
    }
}
