<?php namespace Reuniors\Knk\Http\Actions\V1\Scraper;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use Reuniors\Base\Http\Actions\BaseAction;


class GetInstagramPostDataAction extends BaseAction
{
    protected $userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
    protected $xIgAppId = '936619743392459';

    public function rules()
    {
        return [
            'url' => ['string', 'required'],
        ];
    }

    private function getId(string $url): ?string
    {
        $regex = "/instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(p|reels|reel|stories)\/([A-Za-z0-9-_]+)/";
        preg_match($regex, $url, $matches);
        return $matches[2] ?? null;
    }

    public function handle(array $attributes = [])
    {
        $url = $attributes['url'];
        $igId = $this->getId($url);

        if (!$igId) {
            throw new InvalidArgumentException("Invalid URL");
        }

        $client = new Client();

        try {
            $response = $client->post('https://www.instagram.com/api/graphql', [
                'form_params' => [
                    'variables' => json_encode(['shortcode' => $igId]),
                    'doc_id' => '10015901848480474',
                    'lsd' => 'AVqbxe3J_YA',
                ],
                'headers' => [
                    'User-Agent' => $this->userAgent,
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'X-IG-App-ID' => $this->xIgAppId,
                    'X-FB-LSD' => 'AVqbxe3J_YA',
                    'X-ASBD-ID' => '129477',
                    'Sec-Fetch-Site' => 'same-origin',
                ],
            ]);

            $responseBody = $response->getBody()->getContents();
            $data = json_decode($responseBody, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception("Error decoding JSON response: " . json_last_error_msg());
            }

            $items = $data['data']['xdt_shortcode_media'] ?? [];

            return [
                '__typename' => $items['__typename'] ?? null,
                'shortcode' => $items['shortcode'] ?? null,
                'dimensions' => $items['dimensions'] ?? null,
                'display_url' => $items['display_url'] ?? null,
                'display_resources' => $items['display_resources'] ?? null,
                'has_audio' => $items['has_audio'] ?? null,
                'video_url' => $items['video_url'] ?? null,
                'video_view_count' => $items['video_view_count'] ?? null,
                'video_play_count' => $items['video_play_count'] ?? null,
                'is_video' => $items['is_video'] ?? null,
                'caption' => $items['edge_media_to_caption']['edges'][0]['node']['text'] ?? null,
                'is_paid_partnership' => $items['is_paid_partnership'] ?? null,
                'location' => $items['location'] ?? null,
                'owner' => $items['owner'] ?? null,
                'product_type' => $items['product_type'] ?? null,
                'video_duration' => $items['video_duration'] ?? null,
                'thumbnail_src' => $items['thumbnail_src'] ?? null,
                'clips_music_attribution_info' => $items['clips_music_attribution_info'] ?? null,
                'sidecar' => $items['edge_sidecar_to_children']['edges'] ?? null,
            ];
        } catch (RequestException $e) {
            Log::error('Instagram API request failed', ['error' => $e->getMessage()]);
            throw new Exception("Failed to fetch data from Instagram: " . $e->getMessage());
        }
    }
}
