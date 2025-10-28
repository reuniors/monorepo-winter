<?php

namespace Reuniors\Reservations\Http\Actions\V1;

use Reuniors\Base\Http\Actions\V1\BasePingAction;
use Reuniors\Reservations\Models\Notification;
use Auth;

class NotificationsPingAction extends BasePingAction
{
    public function rules()
    {
        return [
            'locationSlug' => ['required', 'string'],
        ];
    }

    protected function getCacheKeyPrefix(): string
    {
        return 'ping_notifications';
    }

    protected function getAdditionalCacheKeyParts(array $attributes): array
    {
        $user = Auth::getUser();
        return $user ? [$user->id] : [];
    }

    protected function generateCacheData(array $attributes): array
    {
        $user = Auth::getUser();
        $locationSlug = $attributes['locationSlug'] ?? null;

        // Ako nema autentifikovanog korisnika, vrati prazan rezultat
        if (!$user) {
            return $this->buildCacheData(null, 0);
        }

        
        $userQuery = Notification::query()
            ->whereHas('location', function($query) use ($locationSlug) {
                $query->where('slug', $locationSlug);
            })
            ->whereHas('users', function($query) use ($user) {
                $query->where('user_id', $user->id);
            });

        return $this->buildCacheDataFromQuery(
            $userQuery
        );
    }
}

