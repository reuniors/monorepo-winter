<?php namespace Reuniors\Haljina\Models;

use Model;

class Settings extends Model
{
    /**
     * @var array Behaviors implemented by this model.
     */
    public $implement = [
        \System\Behaviors\SettingsModel::class
    ];

    public $settingsCode = 'profile_settings';
    public $settingsFields = 'fields.yaml';


    const ACTIVATE_AUTO = 'auto';
    const ACTIVATE_USER = 'user';
    const ACTIVATE_ADMIN = 'admin';

    const LOGIN_EMAIL = 'email';
    const LOGIN_USERNAME = 'username';

    const REMEMBER_ALWAYS = 'always';
    const REMEMBER_NEVER = 'never';
    const REMEMBER_ASK = 'ask';

    const FREE_PACKAGE_DAILY_LIMIT = 'free_package_daily_limit';
    const FREE_PACKAGE_PHOTO_LIMIT = 'free_package_photo_limit';

    public function initSettingsData()
    {
        $this->free_package_daily_limit = config('winter.user::freePackageDailyLimit', self::FREE_PACKAGE_DAILY_LIMIT);
        $this->free_package_photo_limit = config('winter.user::freePackagePhotoLimit', self::FREE_PACKAGE_PHOTO_LIMIT);

        $this->activate_mode = config('winter.user::activateMode', self::ACTIVATE_AUTO);
        $this->use_throttle = config('winter.user::useThrottle', true);
        $this->block_persistence = config('winter.user::blockPersistence', false);
        $this->allow_registration = config('winter.user::allowRegistration', true);
        $this->login_attribute = config('winter.user::loginAttribute', self::LOGIN_EMAIL);
        $this->remember_login = config('winter.user::rememberLogin', self::REMEMBER_ALWAYS);
        $this->use_register_throttle = config('winter.user::useRegisterThrottle', true);
    }

    public function getActivateModeOptions()
    {
        return [
            self::ACTIVATE_AUTO => [
                'winter.user::lang.settings.activate_mode_auto',
                'winter.user::lang.settings.activate_mode_auto_comment'
            ],
            self::ACTIVATE_USER => [
                'winter.user::lang.settings.activate_mode_user',
                'winter.user::lang.settings.activate_mode_user_comment'
            ],
            self::ACTIVATE_ADMIN => [
                'winter.user::lang.settings.activate_mode_admin',
                'winter.user::lang.settings.activate_mode_admin_comment'
            ]
        ];
    }

    public function getActivateModeAttribute($value)
    {
        if (!$value) {
            return self::ACTIVATE_AUTO;
        }

        return $value;
    }

    public function getLoginAttributeOptions()
    {
        return [
            self::LOGIN_EMAIL => ['winter.user::lang.login.attribute_email'],
            self::LOGIN_USERNAME => ['winter.user::lang.login.attribute_username']
        ];
    }

    public function getRememberLoginOptions()
    {
        return [
            self::REMEMBER_ALWAYS => [
                'winter.user::lang.settings.remember_always',
            ],
            self::REMEMBER_NEVER => [
                'winter.user::lang.settings.remember_never',
            ],
            self::REMEMBER_ASK => [
                'winter.user::lang.settings.remember_ask',
            ]
        ];
    }

    public function getRememberLoginAttribute($value)
    {
        if (!$value) {
            return self::REMEMBER_ALWAYS;
        }

        return $value;
    }
}
