<?php namespace Reuniors\Evodic\Http\Actions\V1\Translation;

use Illuminate\Validation\Rule;
use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\evodic\Enums\TranslationTypesPath;

class TranslationAddAction extends BaseAction {
    public function rules()
    {
        return [
            'dataId' => ['required', 'integer'],
            'language' => ['required', 'string', 'max:2'],
            'type' => ['required', Rule::in(TranslationTypesPath::getEnumKeys())],
            'data' => ['required', 'array'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $type = $attributes['type'];
        $language = $attributes['language'];
        $dataId = $attributes['dataId'];
        $data = $attributes['data'];

        $modelName = TranslationTypesPath::fromName($type);

        $model = $modelName::findOrFail($dataId);

        foreach ($data as $key => $value) {
            $model->setAttributeTranslated($key, $value, $language);
        }

        $model->syncTranslatableAttributes();

        return true;
    }
}
