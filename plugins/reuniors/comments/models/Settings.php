<?php

namespace Reuniors\Comments\Models;

use Model;
use Cms\Classes\Theme;
use Cms\Classes\Page;

/**
 * Class Settings
 * @package Reuniors\Comments\Models
 */
class Settings extends Model
{

    /**
     * @var array
     */
    public $implement = ['System.Behaviors.SettingsModel'];

    // A unique code
    /**
     * @var string
     */
    public $settingsCode = 'reuniors_comments_settings';

    // Reference to field configuration
    /**
     * @var string
     */
    public $settingsFields = 'fields.yaml';

    /**
     * @param null $keyValue
     * @return array
     */
    public function getStatusOptions($keyValue = null)
    {
        return Comments::STATUS;
    }

}