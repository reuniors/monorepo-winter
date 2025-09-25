<?php namespace Reuniors\Evodic\Http\Actions\V1\Translation;

use Illuminate\Validation\Rule;
use Reuniors\Base\Http\Actions\BaseAction;
use reuniors\evodic\Enums\TranslationTypesPath;

class TranslationsGetAction extends BaseAction {
    public function rules()
    {
        return [
            'dataId' => ['required', 'integer'],
            'type' => ['required', Rule::in(TranslationTypesPath::getEnumKeys())],
            'language' => ['string', 'max:3'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $type = $attributes['type'];
        $language = $attributes['language'] ?? null;
        $dataId = $attributes['dataId'];

        $modelName = TranslationTypesPath::fromName($type);

        $translationsQuery = $modelName::where('id', $dataId)
            ->firstOrFail()
            ->translations();

        if ($language) {
            $translationsQuery->where('locale', $language);

            return json_decode($translationsQuery->first()?->attribute_data ?? []);
        }

        return $translationsQuery
            ->get()
            ->each(function ($translation) {
                $translation->attribute_data = json_decode($translation->attribute_data);
            })
            ->pluck('attribute_data', 'locale');
    }
}
