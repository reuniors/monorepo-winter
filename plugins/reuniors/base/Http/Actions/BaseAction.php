<?php namespace Reuniors\Base\Http\Actions;

use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

abstract class BaseAction
{
    use AsAction;

    public abstract function handle(array $attributes = []);

    public function asController(): array
    {
        $args = func_get_args();
        
        // Check if any argument is null (model binding failed)
        foreach ($args as $arg) {
            if ($arg === null) {
                throw new NotFoundHttpException('Resource not found');
            }
        }
        
        // Merge request data with route parameters
        $attributes = request()->all();
        
        // Add route parameters to attributes (e.g., {id} becomes attributes['id'])
        // Route parameters are passed as additional arguments to asController()
        // We need to map them to the attributes array
        $route = request()->route();
        if ($route) {
            $routeParams = $route->parameters();
            $attributes = array_merge($attributes, $routeParams);
        }
        
        // Also add any direct arguments (for backwards compatibility)
        foreach ($args as $index => $arg) {
            // If it's a model instance, use its ID
            if (is_object($arg) && method_exists($arg, 'getKey')) {
                $attributes['id'] = $arg->getKey();
            } elseif (is_scalar($arg)) {
                // For scalar values, try to infer the parameter name
                // Common pattern: first arg is usually 'id'
                if ($index === 0 && !isset($attributes['id'])) {
                    $attributes['id'] = $arg;
                }
            }
        }
        
        return [
            'data' => $this->handle($attributes),
            'success' => true,
        ];
    }

    /**
     * Return a successful response
     */
    protected function successResponse($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Return an error response
     */
    protected function errorResponse($message = 'Error', $code = 400, $errors = null)
    {
        $response = [
            'success' => false,
            'message' => $message
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    /**
     * Return a validation error response
     */
    protected function validationErrorResponse($errors, $message = 'Validation failed')
    {
        return $this->errorResponse($message, 422, $errors);
    }

    /**
     * Return a not found response
     */
    protected function notFoundResponse($message = 'Resource not found')
    {
        return $this->errorResponse($message, 404);
    }

    /**
     * Return an unauthorized response
     */
    protected function unauthorizedResponse($message = 'Unauthorized')
    {
        return $this->errorResponse($message, 401);
    }
}
