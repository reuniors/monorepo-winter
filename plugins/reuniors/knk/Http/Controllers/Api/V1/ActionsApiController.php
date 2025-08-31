<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Backend\Classes\Controller;
use Illuminate\Http\Request;
use Reuniors\Knk\Models\Action;
use Reuniors\Knk\Models\FoodCategory;
use Reuniors\Knk\Models\Location;
use Reuniors\Knk\Models\RestaurantMenu;
use Exception;
use Auth;

class ActionsApiController extends Controller
{
    public $implement = [
        'Reuniors.Knk.Classes.Behaviors.RestControllerExtended'
    ];

    public $restConfig = 'config_rest.yaml';

    public function indexByRestaurantMenu($restaurantMenuId, Request $request)
    {
        $restaurantMenu = RestaurantMenu::findOrFail($restaurantMenuId);
        $changeActions = $restaurantMenu->change_actions();

        $changeActions = $changeActions->orderBy('id', 'desc');
        return $changeActions->paginate(10);
    }

    public function executeActions($locationId, Request $request)
    {
        if (!empty($locationId)) {
            $location = Location::findOrFail($locationId);
            $changeActions = $location->change_actions();
        } else {
            $changeActions = Action::query();
        }
        $actionsIds = $request->get('idList');
        /** @var Action[] $actions */
        $actions = $changeActions->whereIn('id', $actionsIds)->get();
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
        return $changeActions->get();
    }

    public function deleteActions($locationId, Request $request)
    {
        if (!empty($locationId)) {
            $location = Location::findOrFail($locationId);
            $changeActions = $location->change_actions();
        } else {
            $changeActions = Action::query();
        }
        $actionsIds = $request->get('idList');
        /** @var Action[] $actions */
        $changeActions->whereIn('id', $actionsIds)->delete();
        return $changeActions->get();
    }

    public function store($locationId, Request $request)
    {
        $user = Auth::getUser();
        if (!empty($locationId)) {
            $location = Location::findOrFail($locationId);
            $changeActions = $location->change_actions();
        } elseif ($request->has('restaurant_menu_id')) {
            RestaurantMenu::withCount('locations')
//                ->having('locations_count', 0)
                ->findOrFail($request->get('restaurant_menu_id'));
            $changeActions = Action::query();
        }
        $requestData = $request->all([
            'attachment_id', 'action_type', 'data',
            'entity_type', 'location_id', 'attach_to_id',
            'attach_to_relation_name', 'status', 'attachment_type', 'restaurant_menu_id'
        ]);
        $requestData['created_by'] = $user->id;
        $requestData['status'] = Action::STATUS_CREATED;
        $entityType = $requestData['entity_type'] ?? null;
        if (!$entityType || !Action::$entityTypeModel[$entityType]) {
            return 403;
        }
        $requestData['attachment_type'] = Action::$entityTypeModel[$requestData['entity_type']];
        return $changeActions->create($requestData);
    }

    public function update($locationId, Request $request, $id)
    {
        if (!empty($locationId)) {
            $location = Location::findOrFail($locationId);
            $changeActions = $location->change_actions();
        } else {
            $changeActions = Action::query();
        }
        $action = $changeActions->findOrFail($id);
        $action->update($request->all());

        return $action;
    }

    public function delete(Request $request, $id)
    {
//        $article = FoodCategory::findOrFail($id);
//        $article->delete();

        return 204;
    }
}
