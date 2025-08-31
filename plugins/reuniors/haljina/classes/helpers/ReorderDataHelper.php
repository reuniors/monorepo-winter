<?php namespace Reuniors\Haljina\Classes\Helpers;

use Illuminate\Support\Facades\DB;
use Winter\Storm\Database\Builder;

class ReorderDataHelper
{
    public static function reorderModelData(Builder $modelQuery, array $reorderData, $sortOrderKey = 'sort_order', $idKey = 'id'): void
    {

        DB::beginTransaction();
        try {
            foreach ($reorderData as $fromTo) {
                $fromId = $fromTo['from'];
                $toId = $fromTo['to'];

                $dataFrom = (clone $modelQuery)
                    ->where($idKey, $fromId)
                    ->firstOrFail();
                $dataTo = (clone $modelQuery)
                    ->where($idKey, $toId)
                    ->firstOrFail();

                $fromSortOrder = $dataFrom->$sortOrderKey;
                $toSortOrder = $dataTo->$sortOrderKey;

                if ($fromSortOrder > $toSortOrder) {
                    (clone $modelQuery)
                        ->where($sortOrderKey, '>=', $toSortOrder)
                        ->where($sortOrderKey, '<', $fromSortOrder)
                        ->update([
                            $sortOrderKey => DB::raw("$sortOrderKey + 1"),
                        ]);
                } else {
                    (clone $modelQuery)
                        ->where($sortOrderKey, '>', $fromSortOrder)
                        ->where($sortOrderKey, '<=', $toSortOrder)
                        ->update([
                            $sortOrderKey => DB::raw("$sortOrderKey - 1"),
                        ]);
                }
                $dataFrom->$sortOrderKey = $toSortOrder;
                $dataFrom->save();
            }
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
        DB::commit();
    }
}
