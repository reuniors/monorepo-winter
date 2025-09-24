<?php namespace Reuniors\Knk\Http\Actions\V1\Image;

use Illuminate\Support\Facades\Log;
use Reuniors\Base\Http\Actions\BaseAction;
use System\Models\File;
use WebPConvert\WebPConvert;

class ImageToWebpAction extends BaseAction {
    public function rules()
    {
        return [
            'image' => 'required',
        ];
    }

    public function logOutput($output, $message)
    {
        if ($output) {
            $output->writeln($message);
        }
    }

    public function handle(File $image, $output = null)
    {
        $diskPath = $image->getDiskPath();
        $appPath = storage_path('app');
        $path = $appPath . '/' . $diskPath;
        $webp = '.webp';
        $webpPath = $path . $webp;
        $extension = trim($image->getExtension());

        if (ends_with($path, $webp) || !file_exists($path) || (!empty($extension) && !$image->isImage())) {
            return;
        }

        if (!file_exists($webpPath)) {
            try {
                WebPConvert::convert($path, $webpPath, [
                    'quality' => 95,
                ]);
            } catch (\Exception $e) {
                Log::info('locations num: ' . $e->getMessage());
                $this->logOutput($output, 'error:' . $e->getMessage());
            }
        }

        if (!file_exists($webpPath)) {
            return;
        }

        $image->disk_name = $image->disk_name . $webp;
        $image->file_name = $image->file_name . $webp;
        $image->file_size = filesize($webpPath);
        $image->content_type = 'image/webp';
        $image->saveQuietly();

        if (file_exists($webpPath) && file_exists($path)) {
            unlink($path);
        }

        $image->deleteThumbs();
    }
}
