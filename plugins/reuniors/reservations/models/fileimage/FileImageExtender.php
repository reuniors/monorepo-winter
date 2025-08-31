<?php namespace Reuniors\Reservations\Models\FileImage;

use System\Models\File;

class FileImageExtender extends File
{
    const WIDTH_FULL_HD = 1920;
    const WIDTH_HD = 1280;
    const WIDTH_SMALL = 768;
    const WIDTH_MOBILE = 400;

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
            $aspectRatio = static::ASPECT_RATIO;
            $height = $width * $aspectRatio;
            $sizes[$resKey] = $this->getThumb($width, round($height), ['mode' => 'crop']);
        }
        return $sizes;
    }

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->appends = array_merge($this->appends, ['pathByResolution']);
    }
}
