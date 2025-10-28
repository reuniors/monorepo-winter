<?php

namespace Reuniors\Base\Http\Actions\V1;

use Reuniors\Base\Http\Actions\BaseAction;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

abstract class BasePingAction extends BaseAction
{
    /**
     * Cache TTL u sekundama
     */
    protected int $cacheTtl = 60;

    /**
     * Prefix za cache key
     */
    abstract protected function getCacheKeyPrefix(): string;

    /**
     * Generiše cache key
     */
    protected function getCacheKey(array $attributes): string
    {
        $parts = [$this->getCacheKeyPrefix()];
        
        // Dodaj relevantne atribute u cache key
        if (isset($attributes['locationSlug'])) {
            $parts[] = $attributes['locationSlug'];
        }
        
        // Možeš override-ovati ovu metodu za dodatne parametre
        $additionalParts = $this->getAdditionalCacheKeyParts($attributes);
        if (!empty($additionalParts)) {
            $parts = array_merge($parts, $additionalParts);
        }
        
        return implode('_', $parts);
    }

    /**
     * Dodatni delovi cache key-a (override u child klasi ako treba)
     */
    protected function getAdditionalCacheKeyParts(array $attributes): array
    {
        return [];
    }

    /**
     * Generiše podatke za cache
     */
    abstract protected function generateCacheData(array $attributes): array;

    /**
     * Invalidira cache
     */
    private function invalidateCache(array $attributes): void
    {
        $cacheKey = $this->getCacheKey($attributes);
        Cache::forget($cacheKey);
    }

    /**
     * Magic method za statičko pozivanje običnih metoda
     */
    public static function __callStatic($method, $arguments)
    {
        $instance = new static();
        return call_user_func_array([$instance, $method], $arguments);
    }

    public function handle(array $attributes = [], $lastCheck = null)
    {
        $cacheKey = $this->getCacheKey($attributes);

        // Uzmi iz cache-a ili generiši
        $cachedData = Cache::remember($cacheKey, $this->cacheTtl, function() use ($attributes) {
            return $this->generateCacheData($attributes);
        });

        // Proveri da li je bilo promena od poslednje provere
        $hasChanges = $this->checkForChanges($cachedData, $lastCheck);

        return $this->formatResponse($cachedData, $hasChanges);
    }

    /**
     * Formatira response (može se override-ovati u child klasi)
     */
    protected function formatResponse(array $cachedData, bool $hasChanges): array
    {
        return [
            'hasChanges' => $hasChanges,
            'hash' => $cachedData['hash'] ?? null,
            'count' => $cachedData['count'] ?? 0,
            'lastUpdated' => $cachedData['lastUpdated'] ?? null
        ];
    }

    /**
     * Provera da li je bilo promena
     */
    protected function checkForChanges(array $cachedData, $lastCheck): bool
    {
        if ($lastCheck) {
            $lastCheckInSeconds = Carbon::parse($lastCheck)->timestamp;
            return $cachedData['lastUpdated'] !== $lastCheckInSeconds;
        }
        
        return false; // Prva provera - nema promena
    }

    /**
     * Helper za generisanje hash-a
     */
    protected function generateHash($lastUpdated, $count): string
    {
        return md5($lastUpdated . $count);
    }

    /**
     * Helper za kreiranje standardnog cache data response-a iz query-ja
     * 
     * @param mixed $query - Eloquent query builder
     * @param string|callable|null $countWhereColumn - Column name za where clause ili callback funkcija za custom count
     * @param mixed $countWhereValue - Value za where clause
     */
    protected function buildCacheDataFromQuery($query, $countWhereColumn = null, $countWhereValue = null): array
    {
        $lastUpdated = $query->max('updated_at');
        
        if (is_callable($countWhereColumn)) {
            // Ako je callback, koristi ga za count
            $count = $countWhereColumn(clone $query);
        } elseif ($countWhereColumn && $countWhereValue !== null) {
            // Ako je column name, koristi where clause
            $count = (clone $query)->where($countWhereColumn, $countWhereValue)->count();
        } else {
            // Inače, samo count
            $count = (clone $query)->count();
        }

        return $this->buildCacheData($lastUpdated, $count);
    }

    /**
     * Helper za kreiranje standardnog cache data response-a
     */
    protected function buildCacheData($lastUpdated, int $count): array
    {
        return [
            'lastUpdated' => $lastUpdated ? strtotime($lastUpdated) : null,
            'count' => $count,
            'hash' => $this->generateHash($lastUpdated, $count)
        ];
    }
}

