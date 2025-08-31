<?php namespace Reuniors\UserExtended\Models;

use Model;

/**
 * Model
 */
class UserSettings extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    

    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_userextended_user_settings';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
