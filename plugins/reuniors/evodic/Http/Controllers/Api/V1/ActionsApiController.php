<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use Illuminate\Http\Request;
use Reuniors\Knk\Models\Action;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;
use Exception;

class ActionsApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behavior.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function executeActions($locationId, Request $request)
    {
        $location = Location::findOrFail($locationId);
        $actionsIds = $request->get('idList');
        /** @var Action[] $actions */
        $actions = $location->change_actions()->whereIn('id', $actionsIds)->get();
        foreach ($actions as $action) {
            $failReason = null;
            try {
                $action->performActionDataToModel();
            } catch (Exception $e) {
                $failReason = $e->getMessage();
            }
            if ($failReason) {
                $action->status = Action::STATUS_FAIL;
                $action->failure_reason = $failReason;
            }
            $action->forceSave();
        }
        return $location->change_actions()->get();
    }

    public function deleteActions($locationId, Request $request)
    {
        $location = Location::findOrFail($locationId);
        $actionsIds = $request->get('idList');
        /** @var Action[] $actions */
        $location->change_actions()->whereIn('id', $actionsIds)->delete();
        return $location->change_actions()->get();
    }

    public function store($locationId, Request $request)
    {
        $location = Location::findOrFail($locationId);
        $requestData = $request->all();
        $requestData['status'] = Action::STATUS_CREATED;
        $entityType = $requestData['entity_type'] ?? null;
        if (!$entityType || !Action::$entityTypeModel[$entityType]) {
            return 403;
        }
        $requestData['attachment_type'] = Action::$entityTypeModel[$requestData['entity_type']];
        return $location->change_actions()->create($requestData);
    }

    public function update($locationId, Request $request, $id)
    {
        $location = Location::findOrFail($locationId);
        $action = $location->change_actions()->findOrFail($id);
        $action->update($request->all());

        return $action;
    }

    public function delete(Request $request, $id)
    {
        $article = FoodCategory::findOrFail($id);
        $article->delete();

        return 204;
    }
}
