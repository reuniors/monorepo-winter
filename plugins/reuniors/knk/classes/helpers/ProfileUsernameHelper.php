<?php

namespace Reuniors\Knk\Classes\Helpers;

class ProfileUsernameHelper
{
    const PLATFORM_TIKTOK = 't';
    const PLATFORM_YOUTUBE = 'y';
    const PLATFORM_INSTAGRAM = 'i';

    /**
     * Process username and return platform and clean username
     *
     * @param string $username
     * @return array{platform: string, username: string}
     * @throws \Exception
     */
    public static function processUsername(string $username): array
    {
        $username = ltrim($username, '@');
        $firstChar = strtolower(substr($username, 0, 1));
        $cleanUsername = substr($username, 1);

        switch ($firstChar) {
            case self::PLATFORM_TIKTOK:
            case self::PLATFORM_YOUTUBE:
            case self::PLATFORM_INSTAGRAM:
                return [
                    'platform' => $firstChar,
                    'username' => $cleanUsername
                ];
            default:
                throw new \Exception('Invalid username format');
        }
    }

    /**
     * Get platform-specific column name
     *
     * @param string $platform
     * @return string
     */
    public static function getPlatformColumn(string $platform): string
    {
        return match ($platform) {
            self::PLATFORM_TIKTOK => 'tiktok_username',
            self::PLATFORM_YOUTUBE => 'youtube_username',
            self::PLATFORM_INSTAGRAM => 'instagram_username',
            default => throw new \Exception('Invalid platform')
        };
    }
}