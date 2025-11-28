<?php namespace Reuniors\Calendar\Classes\Providers;

use Reuniors\Calendar\Models\CalendarConnection;
use Reuniors\Calendar\Models\CalendarEvent;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

/**
 * AppleCalendarProvider
 * 
 * Currently supports iCalendar (.ics) export only
 * For full sync, consider using Nylas or Cronofy API
 */
class AppleCalendarProvider
{
    /**
     * Create event - generates .ics file for download
     * Note: Apple Calendar doesn't have direct API, so we generate .ics file
     */
    public function createEvent(array $eventData, CalendarConnection $connection)
    {
        // For now, we'll just store the event data
        // The actual .ics file will be generated on-demand via API endpoint
        return [
            'id' => 'ics_' . uniqid(),
            'metadata' => [
                'ics_data' => $this->generateIcsData($eventData),
            ],
        ];
    }

    /**
     * Update event
     */
    public function updateEvent(CalendarEvent $calendarEvent, array $eventData, CalendarConnection $connection)
    {
        // Update local event
        $calendarEvent->start_time_utc = Carbon::parse($eventData['start_time_utc']);
        $calendarEvent->end_time_utc = Carbon::parse($eventData['end_time_utc']);
        $calendarEvent->summary = $eventData['summary'];
        $calendarEvent->description = $eventData['description'] ?? '';
        $calendarEvent->last_synced_at = Carbon::now();
        $calendarEvent->metadata = [
            'ics_data' => $this->generateIcsData($eventData),
        ];
        $calendarEvent->save();
    }

    /**
     * Delete event
     */
    public function deleteEvent(CalendarEvent $calendarEvent, CalendarConnection $connection)
    {
        // For iCalendar, deletion is handled locally
        // No need to call external API
    }

    /**
     * Refresh token - not applicable for iCalendar export
     */
    public function refreshToken(CalendarConnection $connection)
    {
        // iCalendar export doesn't require tokens
        return true;
    }

    /**
     * Generate iCalendar data
     */
    protected function generateIcsData(array $eventData)
    {
        $start = Carbon::parse($eventData['start_time_utc'])->format('Ymd\THis\Z');
        $end = Carbon::parse($eventData['end_time_utc'])->format('Ymd\THis\Z');
        $now = Carbon::now()->format('Ymd\THis\Z');
        
        $ics = "BEGIN:VCALENDAR\r\n";
        $ics .= "VERSION:2.0\r\n";
        $ics .= "PRODID:-//Reuniors//Calendar//EN\r\n";
        $ics .= "BEGIN:VEVENT\r\n";
        $ics .= "UID:" . uniqid() . "@reuniors.com\r\n";
        $ics .= "DTSTAMP:" . $now . "\r\n";
        $ics .= "DTSTART:" . $start . "\r\n";
        $ics .= "DTEND:" . $end . "\r\n";
        $ics .= "SUMMARY:" . $this->escapeIcsText($eventData['summary']) . "\r\n";
        
        if (isset($eventData['description'])) {
            $ics .= "DESCRIPTION:" . $this->escapeIcsText($eventData['description']) . "\r\n";
        }
        
        if (isset($eventData['location'])) {
            $ics .= "LOCATION:" . $this->escapeIcsText($eventData['location']) . "\r\n";
        }
        
        $ics .= "END:VEVENT\r\n";
        $ics .= "END:VCALENDAR\r\n";
        
        return $ics;
    }

    /**
     * Escape text for iCalendar format
     */
    protected function escapeIcsText($text)
    {
        $text = str_replace('\\', '\\\\', $text);
        $text = str_replace(',', '\\,', $text);
        $text = str_replace(';', '\\;', $text);
        $text = str_replace("\n", '\\n', $text);
        return $text;
    }
}

