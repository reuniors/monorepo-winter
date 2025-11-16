<?php namespace Reuniors\Reservations\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\Location;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Lorisleiva\Actions\Concerns\AsAction;

class LocationGetManifestAction
{

    use AsAction;
    public function rules(): array
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $location = Location::where('slug', $attributes['locationSlug'])
            ->where('active', 1)
            ->first();

        if (!$location) {
            throw new NotFoundHttpException('Location not found');
        }

        // Default values
        $defaultThemeColor = '#000000';
        $defaultBackgroundColor = '#000000';
        $defaultScope = '/zakazivanje';
        $defaultVersion = '1.0';

        // Get PWA metadata from JSON field
        $pwaMetadata = $location->pwa_metadata ?? [];
        
        // Get scope from env or use default
        $scope = env('APP_SCOPE', $pwaMetadata['scope'] ?? $defaultScope);
        
        // Get version from env or query parameter or use default
        $version = env('APP_VERSION', request()->query('v', $defaultVersion));
        
        // Get theme colors from metadata or use defaults
        $themeColor = $pwaMetadata['theme_color'] ?? $defaultThemeColor;
        $backgroundColor = $pwaMetadata['background_color'] ?? $defaultBackgroundColor;

        // Generate name and short_name from location title
        $pwaName = $location->title . ' RZR.rs';
        $pwaShortName = $location->title;

        // Generate icon sizes
        // "any" purpose icons use logo
        // "maskable" purpose icons use cover
        $iconSizes = [
            ['size' => 64, 'purpose' => 'any'],
            ['size' => 192, 'purpose' => 'any'],
            ['size' => 512, 'purpose' => 'any'],
            ['size' => 48, 'purpose' => 'maskable'],
            ['size' => 72, 'purpose' => 'maskable'],
            ['size' => 192, 'purpose' => 'maskable'],
            ['size' => 512, 'purpose' => 'maskable'],
        ];

        $icons = [];
        foreach ($iconSizes as $iconConfig) {
            $iconUrl = null;
            $sourceImage = null;
            
            // Use logo for "any" purpose, cover for "maskable" purpose
            if ($iconConfig['purpose'] === 'any' && $location->logo) {
                $sourceImage = $location->logo;
            } elseif ($iconConfig['purpose'] === 'maskable' && $location->logo) {
                $sourceImage = $location->logo;
            }
            
            if ($sourceImage) {
                // Use Winter CMS getThumb method to generate resized icon URLs
                // getThumb returns a URL that uses the resizer system
                // Use 'exact' mode to ensure exact dimensions match the specified sizes
                $iconUrl = $sourceImage->getThumb($iconConfig['size'], $iconConfig['size'], [
                    'mode' => 'exact',
                    'extension' => 'png',
                    'quality' => 90,
                ]);
            }
            
            // Only add icon if we have a valid URL
            if ($iconUrl) {
                $icons[] = [
                    'src' => $iconUrl . '?v=' . $version,
                    'sizes' => $iconConfig['size'] . 'x' . $iconConfig['size'],
                    'type' => 'image/png',
                    'purpose' => $iconConfig['purpose'],
                ];
            }
        }

        $startUrl = $scope . '?v=' . $version;
        $id = $scope . '?v=' . $version;

        $manifest = [
            'name' => $pwaName,
            'short_name' => $pwaShortName,
            'start_url' => $startUrl,
            'id' => $id,
            'display' => 'standalone',
            'background_color' => $backgroundColor,
            'theme_color' => $themeColor,
            'lang' => 'sr',
            'scope' => $scope,
            'icons' => $icons,
        ];

        return $manifest;
    }

    public function asController()
    {
        $manifest = $this->handle(request()->all());
        
        return response()->json($manifest, 200, [
            'Content-Type' => 'application/manifest+json',
        ]);
    }
}
