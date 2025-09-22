<?php namespace Reuniors\Base\Http\Actions\V1\Translation;

use Illuminate\Http\Request;
use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Base\Models\Translation;

class CreateTranslationAction
{
    use AsAction;

    public function rules()
    {
        return [
            'entity_type' => 'required|string|max:255',
            'entity_id' => 'required|integer',
            'field_name' => 'required|string|max:255',
            'language' => 'required|string|size:5',
            'value' => 'required|string',
        ];
    }

    public function handle(array $data)
    {
        // Check if translation already exists
        $existingTranslation = Translation::forField(
            $data['entity_type'],
            $data['entity_id'],
            $data['field_name']
        )->where('language', $data['language'])->first();

        if ($existingTranslation) {
            $existingTranslation->update(['value' => $data['value']]);
            $translation = $existingTranslation;
        } else {
            $translation = Translation::create($data);
        }

        return [
            'success' => true,
            'data' => $translation,
            'message' => 'Translation saved successfully'
        ];
    }

    public function asController(Request $request)
    {
        return $this->handle($request->all());
    }
}
