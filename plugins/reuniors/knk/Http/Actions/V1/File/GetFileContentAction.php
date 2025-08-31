<?php namespace reuniors\knk\Http\Actions\V1\File;

use Exception;
use Illuminate\Support\Facades\DB;
use Reuniors\Knk\Http\Actions\BaseAction;
use System\Models\File;

class GetFileContentAction extends BaseAction
{
    public function rules()
    {
        return [
            'url' => ['string', 'required'],
            'width' => ['integer'],
            'height' => ['integer'],
        ];
    }

    public function handle(array $attributes = [])
    {
        $url = $attributes['url'];
        $width = $attributes['width'] ?? 150;
        $height = $attributes['height'] ?? 150;

        DB::beginTransaction();

        try {
            $file = (new File)->fromUrl($url);
            $file->save();
            $tableName = $file->getTable();
            $lastId = $file->id;

            $thumbPath = $file->getThumb($width, $height, ['mode' => 'auto']);
            $thumb = (new File)->fromUrl($thumbPath);
            $thumb->save();

            $content = $thumb->getContents();

            $file->delete();
            $thumb->delete();
            DB::commit();
            DB::statement("ALTER TABLE $tableName AUTO_INCREMENT = $lastId;");

        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }


        return $content;
    }
}
