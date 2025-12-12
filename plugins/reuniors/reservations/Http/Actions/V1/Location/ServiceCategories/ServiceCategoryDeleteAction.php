<?php namespace Reuniors\Reservations\Http\Actions\V1\Location\ServiceCategories;

use Reuniors\Base\Http\Actions\BaseAction;
use Reuniors\Reservations\Models\ServiceCategory;

class ServiceCategoryDeleteAction extends BaseAction
{
    public function rules()
    {
        return [];
    }

    public function handle(array $attributes = [], ServiceCategory $serviceCategory = null)
    {
        // Detach from service groups
        $serviceCategory->serviceGroups()->detach();
        
        // Delete the category
        $serviceCategory->delete();
        
        return true;
    }

    public function asController(ServiceCategory $serviceCategory = null): array
    {
        return parent::asController($serviceCategory);
    }
}

