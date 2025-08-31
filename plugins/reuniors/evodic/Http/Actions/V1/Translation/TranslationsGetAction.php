<?php namespace Reuniors\Evodic\Http\Actions\V1\Translation;

use Illuminate\Validation\Rule;
use Lorisleiva\Actions\Concerns\AsAction;
use reuniors\evodic\Enums\TranslationTypesPath;

class TranslationsGetAction
{
    use AsAction;

    public function rules()
    {
        return [
            'dataId' => ['required', 'integer'],
            'type' => ['required', Rule::in(TranslationTypesPath::getEnumKeys())],
            'language' => ['string', 'max:3'],
        ];
    }

    public function handle(array $attributes)
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

    public function asController()
    {
        $requestData = request()->all();

        return [
            'data' => $this->handle($requestData),
            'success' => true,
        ];
    }
}
