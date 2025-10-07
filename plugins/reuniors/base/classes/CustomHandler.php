<?php namespace Reuniors\Base\Classes;

use October\Rain\Foundation\Exception\Handler;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Response;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/* Custom error handler which replaces the default error handler for OctoberCMS. */
class CustomHandler extends Handler
{
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function render($request, \Throwable $throwable)
    {
        /* Custom JSON response for ModelNotFoundException exceptions. */
        if($throwable instanceof ModelNotFoundException){
            return Response::json(['error' => 'A record was not found for the resource that was requested.'], 404);
        }

        /* Handle validation errors properly - return 422 instead of 500 */
        if ($throwable instanceof \Illuminate\Validation\ValidationException) {
            return Response::json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $throwable->errors()
            ], 422);
        }

        /* Handle general exceptions with proper error codes */
        if ($throwable instanceof \Exception) {
            $statusCode = $this->getStatusCode($throwable);
            
            // Don't return 500 for validation or client errors
            if ($statusCode >= 400 && $statusCode < 500) {
                return Response::json([
                    'success' => false,
                    'message' => $throwable->getMessage()
                ], $statusCode);
            }
        }

        /* The rest of this code is just the 'default' code from OctoberCMS' error handler. */
        /* The only change is the code above this comment where I handle a specific exception in a unique way.*/
        /* i.e. I decided to return JSON for the error rather than an HTML error page (in debug mode). */
        if (!class_exists('Event')) {
            return parent::render($request, $throwable);
        }

        $statusCode = $this->getStatusCode($throwable);
        $response = $this->callCustomHandlers($throwable);

        if (!is_null($response)) {
            return Response::make($response, $statusCode);
        }

        if ($event = Event::fire('exception.beforeRender', [$throwable, $statusCode, $request], true)) {
            return Response::make($event, $statusCode);
        }

        return parent::render($request, $throwable);
    }
}
