<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;

class TagGroupsApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';
}
