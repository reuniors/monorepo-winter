<?php namespace Reuniors\Base\Http\Actions\V1\Translation;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\Translation;

class GetTranslationsAction
{
    use AsAction;

    public function rules()
    {
        return [
            'entity_type' => 'required|string|max:255',
            'entity_id' => 'required|integer',
            'field_name' => 'nullable|string|max:255',
            'language' => 'nullable|string|size:5',
        ];
    }

    public function handle(array $attributes = [])
    {
        $entityType = $attributes['entity_type'];
        $entityId = $attributes['entity_id'];
        $fieldName = $attributes['field_name'] ?? null;
        $language = $attributes['language'] ?? null;

        $translations = Translation::forEntity($entityType, $entityId);

        if ($fieldName) {
            $translations->where('field_name', $fieldName);
        }

        if ($language) {
            $translations->where('language', $language);
        }

        return [
            'success' => true,
            'data' => $translations->get()
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
