<?php namespace Reuniors\Knk\Http\ActionsFe\V1\Proxy;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Knk\Models\LocationVideoReview;

class ProxyInstagramImageAction extends BaseAction
{

    public function rules()
    {
        return [
            'videReviewId' => ['numeric', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $videReviewId = $attributes['videReviewId'];
        $client = new Client();

        try {
            $videoReview = LocationVideoReview::findOrFail($videReviewId);
            // Guzzle request
            $response = $client->request('GET', $videoReview->thumbnail_url, [
                'timeout' => 10,
            ]);

            // Return the streamed response
            return response()->stream(function () use ($response) {
                echo $response->getBody()->getContents();
            }, 200, [
                'Content-Type' => $response->getHeaderLine('Content-Type'),
                'Content-Disposition' => 'inline',
                'Cache-Control' => 'public, max-age=3600',
            ]);
        } catch (RequestException $e) {
            Log::error('Failed to proxy Instagram image', [
                'url' => $url,
                'error' => $e->getMessage(),
            ]);
            abort(500, 'Internal server error: Unable to fetch the image.');
        }
    }

    public function asController()
    {
        return $this->handle(request()->all());
    }
}
