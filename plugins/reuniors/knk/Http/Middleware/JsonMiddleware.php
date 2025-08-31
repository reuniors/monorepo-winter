<?php namespace Reuniors\Knk\Http\Middleware;

use Exception;
use Closure;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;

class JsonMiddleware
{
    /**
     * The Response Factory our app uses
     *
     * @var ResponseFactory
     */
    protected $factory;

    /**
     * JsonMiddleware constructor.
     *
     * @param ResponseFactory $factory
     */
    public function __construct(ResponseFactory $factory)
    {
        $this->factory = $factory;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            // First, set the header so any other middleware knows we're
            // dealing with a should-be JSON response.
            $request->headers->set('Accept', 'application/json');

            // Get the response
            $response = $next($request);

            // If the response is not strictly a JsonResponse, we make it
            if (!$response instanceof JsonResponse) {
                if ($response->exception) {
                    $data = [];
                    $message = $response->exception->getMessage();
                    $success = false;
                } elseif ($response->status() !== 200) {
                    $message = $response->statusText();
                    $data = $response->getContent();
                    $success = false;
                } else {
                    $message = 'Success';
                    $data = $response->content();
                    $success = true;
                }
                $response = $this->factory->json(
                    [
                        'message' => $message,
                        'data' => $data,
                        'success' => $success,
                    ],
                    $response->status(),
                    $response->headers->all()
                );
            }

            return $response;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
