<?php namespace Reuniors\Knk\Models\FileImage;

use Url;
use System\Classes\ImageResizer;
use System\Models\File;

class FileImageExtender extends File
{
    const WIDTH_FULL_HD = 1920;
    const WIDTH_HD = 1280;
    const WIDTH_SMALL = 768;
    const WIDTH_MOBILE = 400;

//    protected $hidden = ['pathByResolution'];

    private $resolutions = [
        'fullHd' => self::WIDTH_FULL_HD,
        'hd' => self::WIDTH_HD,
        'small' => self::WIDTH_SMALL,
        'mobile' => self::WIDTH_MOBILE,
    ];

    const ASPECT_RATIO = null;

    public function getPathByResolutionAttribute()
    {
        $sizes = [];
        foreach ($this->resolutions as $resKey => $resolution) {
            $width = $resolution;
            $aspectRatio = self::ASPECT_RATIO;
            $height = $width * $aspectRatio;
            if (file_exists($this->getLocalPath())) {
                $sizes[$resKey] = Url::asset(ImageResizer::filterGetUrl($this, $width, $height, ['mode' => 'auto']));
            } else {
                $sizes[$resKey] = Url::asset(media_path('no-image.png'));
            }
        }
        return $sizes;
    }

//    public function afterSave()
//    {
//        ImageToWebpAction::run($this);
//    }

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->appends = array_merge($this->appends, ['pathByResolution']);
    }
}
