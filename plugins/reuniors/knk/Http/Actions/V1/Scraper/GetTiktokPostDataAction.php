<?php namespace Reuniors\Knk\Http\Actions\V1\Scraper;

use Reuniors\Base\Http\Actions\BaseAction;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Exception;

class GetTiktokPostDataAction extends BaseAction
{
    public function rules()
    {
        return [
            'url' => ['string', 'required'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $url = $attributes['url'];
        $client = new Client();

        try {
            $response = $client->get('https://www.tiktok.com/oembed', [
                'query' => [
                    'url' => $url,
                ],
            ]);
            $responseBody = $response->getBody()->getContents();
            $data = json_decode($responseBody, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception("Error decoding JSON response: " . json_last_error_msg());
            }
            return $data;
        } catch (RequestException $e) {
            throw new Exception("Error fetching Tiktok data: " . $e->getMessage());
        }
    }
}
