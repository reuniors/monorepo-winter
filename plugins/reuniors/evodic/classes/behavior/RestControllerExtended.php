<?php namespace Reuniors\Evodic\Classes\Behavior;

use Illuminate\Contracts\Debug\ExceptionHandler;
use Request;
use Mohsin\Rest\Behaviors\RestController;
use Reuniors\Evodic\Classes\Handlers\CustomApiHandler;
use Reuniors\Base\Classes\CustomHandler;
use App;
use Exception;

class RestControllerExtended extends RestController
{

    public function index()
    {
        $indexArgs = func_get_args();
        $data = Request::all();

        $relationData = $this->config->relationData;
        $childModel = null;
        if (!($indexArgs || $relationData)) {
            throw new Exception('Wrong Controller setup: ' . class_basename($this));
        }
        if ($indexArgs) {
            $relationDataNames = $relationData['relationNames'];
            $mainClassName = $relationData['mainClass'];
            if (!$mainClassName || !$relationDataNames || count($relationDataNames) !== count($indexArgs)) {
                throw new Exception('Wrong Controller setup: ' . class_basename($this));
            }
            $mainModel = $this->createMainModel();
            $childModel = $mainModel;
            foreach ($indexArgs as $index => $arg) {
                $relationName = $relationDataNames[$index];
                $childModel = $childModel->findOrFail($arg);
                if ($childModel->hasRelation($relationName)) {
                    $childModel = $childModel->{$relationName}();
                }
            }
        }
        $options = $this->config->allowedActions['index'];
        $relations = $this->config->allowedActions['index']['relations'] ?? [];
        $page = array_get($data, 'page', 1);
        $filters = array_get($data, 'filters', 1);

        /**
         * Default options
         * @var $page
         * @var $pageSize
         */
        extract(array_merge([
            'page'       => $page,
            'pageSize'    => 5
        ], $options));

        try {
            $model = $childModel ?: $this->controller->createModelObject();
            $model = $this->controller->extendModel($model) ?: $model;
            if (!empty($filters)) {

            }

            return response()->json(
                $this->controller->getPaginator(
                    $model->with($relations),
                    $pageSize,
                    $page
                ), 200
            );
        }
        catch (\Exception $ex) {
            return response()->json($ex -> getMessage(), 400);
        }
    }

    /**
     * Internal method, prepare the model object
     * @return Model
     */
    protected function createMainModel()
    {
        $class = $this->config->relationData['mainClass'];
        return new $class();
    }

    public function __construct($controller)
    {
        App::singleton(
            ExceptionHandler::class,
            CustomApiHandler::class
        );
        parent::__construct($controller);
    }
}
