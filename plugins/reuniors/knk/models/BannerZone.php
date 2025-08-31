<?php namespace Reuniors\Knk\Models;

use Model;

/**
 * Model
 */
class BannerZone extends Model
{
    use \October\Rain\Database\Traits\Validation;
    
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_knk_banner_zones';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $jsonable = ['metadata', 'image_meta'];

    public $hasMany = [
        'banners' => ['Reuniors\Knk\Models\Banner', 'order' => 'sort_order']
    ];

    public $appends = ['resize_data'];

    public function getResizeDataAttribute()
    {
        $options = [
            'other' => []
        ];
        $options['width'] = isset($this->image_meta['width']) && !empty($this->image_meta['width'])
            ? $this->image_meta['width'] : false;
        $options['height'] = isset($this->image_meta['height']) && !empty($this->image_meta['height'])
            ? $this->image_meta['height'] : false;
        if (isset($this->image_meta['mode']) && !empty($this->image_meta['mode'])) {
            $options['other']['mode'] = $this->image_meta['mode'];
        }
        if (isset($this->image_meta['extension']) && !empty($this->image_meta['extension'])) {
            $options['other']['extension'] = $this->image_meta['extension'];
        }
        if (isset($this->image_meta['offset_x']) && !empty($this->image_meta['offset_x'])) {
            $options['other']['offset_x'] = $this->image_meta['offset_x'];
        }
        if (isset($this->image_meta['offset_y']) && !empty($this->image_meta['offset_y'])) {
            $options['other']['offset_y'] = $this->image_meta['offset_y'];
        }
        if (isset($this->image_meta['quality']) && !empty($this->image_meta['quality'])) {
            $options['other']['quality'] = $this->image_meta['quality'];
        }
        if (isset($this->image_meta['sharpen']) && !empty($this->image_meta['sharpen'])) {
            $options['other']['sharpen'] = $this->image_meta['sharpen'];
        }
        return $options;
    }
}
