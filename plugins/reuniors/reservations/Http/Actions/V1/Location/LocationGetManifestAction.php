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
        $defaultName = 'RZR.rs';
        $defaultShortName = 'RZR';
        $defaultThemeColor = '#000000';
        $defaultBackgroundColor = '#000000';
        $defaultScope = '/zakazivanje';
        $defaultIconPath = '/apps/rzr/images/default-pwa-icon.png';

        // Get PWA metadata from JSON field
        $pwaMetadata = $location->pwa_metadata ?? [];
        
        // Get location-specific values or use defaults/auto-generated
        $pwaName = $pwaMetadata['name'] ?? ($location->title . ' ' . $defaultName);
        $pwaShortName = $pwaMetadata['short_name'] ?? ($location->title ?: $defaultShortName);
        $themeColor = $pwaMetadata['theme_color'] ?? $defaultThemeColor;
        $backgroundColor = $pwaMetadata['background_color'] ?? $defaultBackgroundColor;
        $scope = $pwaMetadata['scope'] ?? $defaultScope;

        // Generate icon sizes
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
            $iconUrl = $defaultIconPath;
            
            if ($location->pwa_icon) {
                // Use Winter CMS getThumb method to generate resized icon URLs
                // getThumb returns a URL that uses the resizer system
                $iconUrl = $location->pwa_icon->getThumb($iconConfig['size'], $iconConfig['size'], [
                    'mode' => 'crop',
                    'extension' => 'png',
                ]);
            }

            $icons[] = [
                'src' => $iconUrl,
                'sizes' => $iconConfig['size'] . 'x' . $iconConfig['size'],
                'type' => 'image/png',
                'purpose' => $iconConfig['purpose'],
            ];
        }

        // Get version from query parameter or use default
        $version = request()->query('v', '1.0');
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
