<?php namespace Reuniors\Knk\Classes;

use October\Rain\Foundation\Exception\Handler;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Response;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/* Custom error handler which replaces the default error handler for OctoberCMS. */
class CustomApiHandler extends Handler
{
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $throwable
     * @return mixed
     */
    public function render($request, Exception|\Throwable $throwable)
    {
        $statusCode = $this->getStatusCode($throwable);

        return Response::json(['error' => $throwable->getMessage()], $statusCode);
    }
}
