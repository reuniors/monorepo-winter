<?php namespace Reuniors\Haljina\Models;

use Auth;
use Model;
use Reuniors\Haljina\Http\Enums\ProductStatuses;

/**
 * Model
 */
class Product extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'user_id',
        'status',
        'name',
        'title',
        'slug',
        'active',
        'price',
        'category_id',
        'currency_id',
        'size_id',
        'quantity',
    ];

    protected $hidden = [
        'deleted_at',
        'user_id'
    ];

    const VALID_STATUSES = [
        ProductStatuses::PENDING,
        ProductStatuses::ACTIVE,
        ProductStatuses::INACTIVE,
        ProductStatuses::SOLD,
        ProductStatuses::DELETED,
    ];

    const PRODUCT_RULES = [

    ];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_haljina_products';

    /**
     * @var array Validation rules
     */
    public $rules = [
        'quantity' => ['integer', 'min:1'],
    ];

    public $attachMany = [
        'product_images' => ['System\Models\File', 'delete' => true],
    ];

    public $belongsTo = [
        'user' => [
            'Winter\User\Models\User',
            'key' => 'user_id',
        ],
        'category' => [
            'Reuniors\Haljina\Models\Category',
            'key' => 'category_id',
        ],
        'currency' => [
            'Reuniors\Haljina\Models\Currency',
            'key' => 'currency_id',
        ],
        'size' => [
            'Reuniors\Haljina\Models\ProductSize',
            'key' => 'size_id',
        ],
    ];

    /**
     * @param array $attributes
     * @return void
     */
    public static function deleteProduct(array $attributes = [])
    {
        /**
         * @var $id
         * @var $isDraft
         */
        extract(array_merge([
            'id' => null,
            'isDraft' => false,
        ], $attributes));

        $user = Auth::user();

        $productQuery = Product::where('user_id', $user->id)
            ->with('product_images');

        if ($isDraft) {
            $productQuery->where('status', ProductStatuses::DRAFT);
        }
        if ($id) {
            $productQuery->where('id', $id);
        }

        $product = $productQuery->firstOrFail();

        $product->product_images()->each(function ($image) {
            $image->delete();
        });

        $product->delete();
    }
}
