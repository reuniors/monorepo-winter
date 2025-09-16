<?php namespace Reuniors\Reservations\Classes;

use Model;
use Illuminate\Support\Facades\DB;
use Reuniors\Base\Classes\Helpers\ReorderDataHelper;
use Log;

abstract class BaseModelWithSort extends Model
{
    /**
     * The sort order column name
     */
    protected $sortOrderColumn = 'sort_order';

    /**
     * The ID column name
     */
    protected $idColumn = 'id';

    /**
     * Boot the model and add the beforeUpdate event
     */
    public static function boot()
    {
        parent::boot();

        static::updating(function ($model) {
            $model->handleSortOrderChange();
        });
    }

    /**
     * Handle sort order changes automatically
     */
    protected function handleSortOrderChange()
    {
        $oldSortOrder = $this->getOriginal($this->sortOrderColumn);
        $newSortOrder = $this->getAttribute($this->sortOrderColumn);

        // Check if sort_order is being changed
        if ($this->isDirty($this->sortOrderColumn)) {
            $oldSortOrder = $this->getOriginal($this->sortOrderColumn);
            $newSortOrder = $this->getAttribute($this->sortOrderColumn);

            // If the sort order is actually different
            if ($oldSortOrder !== $newSortOrder) {
                $this->reorderItems($oldSortOrder, $newSortOrder);
            }
        }
    }

    /**
     * Reorder items when sort order changes
     */
    protected function reorderItems($oldSortOrder, $newSortOrder)
    {
        $query = $this->newQuery();
        
        // Apply any additional conditions (like location_id, group_id, etc.)
        $this->applySortOrderConditions($query);

        if ($oldSortOrder > $newSortOrder) {
            // Moving up: increment sort_order for items between new and old position
            $query->where($this->sortOrderColumn, '>=', $newSortOrder)
                  ->where($this->sortOrderColumn, '<', $oldSortOrder)
                  ->update([
                      $this->sortOrderColumn => DB::raw("{$this->sortOrderColumn} + 1")
                  ]);
        } else {
            // Moving down: decrement sort_order for items between old and new position
            $query->where($this->sortOrderColumn, '>', $oldSortOrder)
                  ->where($this->sortOrderColumn, '<=', $newSortOrder)
                  ->update([
                      $this->sortOrderColumn => DB::raw("{$this->sortOrderColumn} - 1")
                  ]);
        }
    }

    /**
     * Apply additional conditions for the sort order query
     * Override this method in child classes to add specific conditions
     */
    protected function applySortOrderConditions($query)
    {
        // Default implementation - override in child classes
        // Example: $query->where('location_id', $this->location_id);
    }

    /**
     * Get the sort order column name
     */
    public function getSortOrderColumn()
    {
        return $this->sortOrderColumn;
    }

    /**
     * Get the ID column name
     */
    public function getIdColumn()
    {
        return $this->idColumn;
    }

    /**
     * Set sort order with automatic reordering
     */
    public function setSortOrder($sortOrder)
    {
        $this->setAttribute($this->sortOrderColumn, $sortOrder);
        return $this;
    }

    /**
     * Get the next available sort order
     */
    public function getNextSortOrder()
    {
        $query = $this->newQuery();
        $this->applySortOrderConditions($query);
        
        $maxSortOrder = $query->max($this->sortOrderColumn);
        return ($maxSortOrder ?? 0) + 1;
    }

    /**
     * Move item to a specific position
     */
    public function moveToPosition($newPosition)
    {
        $oldPosition = $this->getAttribute($this->sortOrderColumn);
        
        if ($oldPosition !== $newPosition) {
            $this->setAttribute($this->sortOrderColumn, $newPosition);
            $this->save();
        }
        
        return $this;
    }

    /**
     * Move item up in the order
     */
    public function moveUp()
    {
        $currentPosition = $this->getAttribute($this->sortOrderColumn);
        if ($currentPosition > 1) {
            $this->moveToPosition($currentPosition - 1);
        }
        return $this;
    }

    /**
     * Move item down in the order
     */
    public function moveDown()
    {
        $currentPosition = $this->getAttribute($this->sortOrderColumn);
        $this->moveToPosition($currentPosition + 1);
        return $this;
    }
} 