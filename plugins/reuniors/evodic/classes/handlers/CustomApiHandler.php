<?php namespace Reuniors\Evodic\Classes\Handlers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use October\Rain\Foundation\Exception\Handler;
use Illuminate\Support\Facades\Response;
use Throwable;

/* Custom error handler which replaces the default error handler for OctoberCMS. */
class CustomApiHandler extends Handler
{
    /**
     * Render an exception into an HTTP response.
     *
     * @param Request $request
     * @param Throwable $throwable
     * @return JsonResponse
     */
    public function render($request, Throwable $throwable)
    {
        $statusCode = $this->getStatusCode($throwable);

        return Response::json(['error' => $throwable->getMessage()], $statusCode);
    }
}
