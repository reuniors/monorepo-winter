<?php

return [
    /*
     * Path to the json file containing the credentials.
     * We don't use this - we set access_token directly at runtime.
     */
    'service_account_credentials_json' => storage_path('app/google-calendar/service-account-credentials.json'),

    /*
     * The id of the Google Calendar that will be used by default.
     * This is overridden at runtime by GoogleCalendarProvider.
     */
    'calendar_id' => env('GOOGLE_CALENDAR_ID', 'primary'),

    /*
     * The email address of the user account to impersonate.
     */
    'user_to_impersonate' => env('GOOGLE_CALENDAR_IMPERSONATE'),

    /*
     * Configuration for the access token (used for dynamic OAuth).
     * This is set dynamically by the GoogleCalendarProvider class at runtime.
     * We use this instead of auth profiles.
     */
    'access_token' => null, // Set at runtime from database
];

