<?php namespace Reuniors\Knk\Models;

use October\Rain\Database\Traits\SoftDelete;
use October\Rain\Database\Traits\Sortable;
use October\Rain\Database\Traits\Validation;
use Reuniors\Knk\ModelExtenders\ModelActionDataExtender;
use Reuniors\Knk\Models\Action\ActionData;

/**
 * Model
 */
class FoodAddon extends MariaDbBase
{
    use Validation;
    use SoftDelete;
    use Sortable;
    use ModelActionDataExtender;

    const SORT_ORDER = 'sort_order';

    protected $dates = ['deleted_at'];

    protected $jsonable = ['addons_dependencies'];

    public $realPrice = null;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_food_addons';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $fillable = [
        'name',
        'title',
        'price',
        'active',
        'food_addon_group_id'
    ];

    public $appends = ['real_price'];

    public $hidden = ['food_addon_group'];

    public $belongsTo = [
        'food_addon_group' => ['Reuniors\Knk\Models\FoodAddonGroup']
    ];

    public $belongsToMany = [
        'foods' => [
            'Reuniors\Knk\Models\Food',
            'table' => 'reuniors_knk_foods_food_addons',
            'pivot' => ['overridden_price'],
        ],
    ];

    public function getRelatedAddonNameOptions()
    {
        return [
            '1' => 'aaa',
            '2' => 'bbb'
        ];
    }

    public function getRealPriceAttribute()
    {
        if ($this->relationLoaded('food_addon_group') && $this->food_addon_group->type === 'size') {
            return $this->realPrice;
        }
        return $this->price;
    }

    public function getConditionalPriceAttribute()
    {
        if (!$this->exists) {
            return 0;
        }
        $foodId = input('food_id');
        if (empty($foodId) || $this->food_addon_group->type !== 'size') {
            return $this->price;
        }
        $food = $this->foods()
            ->find($foodId);
        if (empty($food)) {
            $this->foods()->attach($foodId);
            $food = $this->foods->find($foodId);
        }
        return $food->pivot->overridden_price;
    }

    public function afterSave()
    {
        $foodId = input('food_id');
        $foodAddonData = post('FoodAddon');
        if ($foodAddonData) {
            $this->updatePrice($foodId, $foodAddonData['_conditional_price']);
        }
    }

    public function updatePrice($foodId, $newPrice)
    {
        if (!isset($foodId)) {
            return null;
        }
        if ($this->food_addon_group->type !== 'size') {
            if ($this->price == $newPrice) {
                return null;
            }
            $this->price = $newPrice ?? 0;
            return $this->save();
        }
        $food = $this->foods()
            ->find($foodId);
        if ($newPrice && empty($food)) {
            $this->foods()->attach($foodId);
            $food = $this->foods->find($foodId);
        } elseif (!$newPrice) {
            if (!empty($food)) {
                $this->foods()->detach($foodId);
            }
            return null;
        }
        $food->pivot->overridden_price = $newPrice;
        $food->pivot->save();
    }

    /**
     * @throws \Exception
     */
    public function setActionData(array $data)
    {
        $this->actionData = (new ActionData())
            ->setHasName(true)
            ->addToDataMapper('title')
            ->addToDataMapper('price')
            ->addToDataMapper('real_price', 'price')
            ->addToDataMapper('group_id', 'food_addon_group_id')
            ->addToPivotDataMapper('price', 'foods')
            ->addToDataMapper('active')
            ->setData($data);
    }

    public function setPivotActionData(array $pivotData, $attachToRelationName, $attachToId)
    {
        $this->actionData = (new ActionData())
            ->setHasName(true)
            ->addToPivotDataMapper('price', 'foods', 'overridden_price')
            ->setPivotData($pivotData, $attachToRelationName, $attachToId);
    }
}
