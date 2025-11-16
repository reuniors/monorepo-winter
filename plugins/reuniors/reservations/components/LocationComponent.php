<?php
namespace Reuniors\Reservations\Components;

use Cms\Classes\ComponentBase;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Reuniors\Reservations\Models\Location;
use Log;
use Request;
use Winter\User\Facades\Auth;

class LocationComponent extends ComponentBase
{
    public $locationData = null;
    public $locationSlug = null;

    /**
     * Gets the details for the component
     */
    public function componentDetails()
    {
        return [
            'name' => 'Location Component',
            'description' => 'No description provided yet...'
        ];
    }

    /**
     * Returns the properties provided by the component
     */
    public function defineProperties()
    {
        return [
            'slug' => [
                'title' => 'Slug',
                'description' => 'Slug',
                'default' => '{{ :slug }}',
                'type' => 'string',
            ],
        ];
    }

    public static function getSubdomain()
    {
        // Get the host from the request
        $host = Request::getHost();

        // Assuming your domain is "example.com"
        $domain = env('APP_DOMAIN', 'rzr.rs');

        // Extract the subdomain from the host
        $subdomain = str_replace('.' . $domain, '', $host);

        return $domain === $host ? null : $subdomain;
    }

    public function onRun()
    {
        $subdomain = self::getSubdomain();
        $this->page['subdomain'] = $subdomain ?? null;

        $locationSlug = env('BACKUP_LOCATION', $subdomain ?? $this->property('slug'));
        $this->page['pageImage'] = null;

        if ($locationSlug) {
            $this->locationSlug = $this->page['locationSlug'] = $locationSlug;
            $this->locationData = $this->page['locationData'] = Location::getFeData([
                'slug' => $locationSlug
            ])
                ->firstOrFail();
            
            // Check if location is private and user is not authenticated
            if ($this->locationData->is_private && !Auth::check()) {
                return Redirect::to('/zakazivanje/login');
            }
            
            $this->page['pageTitle'] = $this->locationData->snippet ?? $this->locationData->title;
            $this->page['pageDescription'] = Str::of($this->locationData->description)->limit(160);
            $this->page['pageImage'] = $this->locationData->cover?->getPath() ?? null;
        } else {
            return Redirect::to('/partneri');
        }
    }
}
