<?php namespace Reuniors\Knk\Classes\Helpers;

class ArrayH
{
    /**
     * @param $chunkedKey
     * @param array $data
     * @param null $defaultValue
     * @param string $chunkDelimiter - is `.` by default
     * @return array|mixed|null
     */
    public static function getDeepData($chunkedKey, array $data, $defaultValue = null, string $chunkDelimiter = '.')
    {
        $returnData = $data;
        $chunkedParts = explode($chunkDelimiter, $chunkedKey);
        foreach ($chunkedParts as $chunkedPart) {
            if (array_key_exists($chunkedPart, $returnData)) {
                $returnData = $returnData[$chunkedPart];
            } else {
                return $defaultValue;
            }
        }
        return $returnData;
    }
}
