<?php namespace Reuniors\Knk\Http\Actions\V1\General;

use Reuniors\Base\Http\Actions\BaseAction;
use Log;

class ProductionLoggingAction extends BaseAction {
    

    private const LOG_PARAM = 'logIt';

    public function handle(string $message, bool $withRequestDuration = false)
    {
        if (!self::hasLogParam()) {
            return;
        }

        if ($withRequestDuration) {
            $message .= ' - Request duration: ' . bcsub(microtime(TRUE), '' . request()->server('REQUEST_TIME_FLOAT'), 4) . 's';
        }

        Log::info($message);
    }

    public  static function hasLogParam(): bool
    {
        return request()->has(self::LOG_PARAM);
    }
}
