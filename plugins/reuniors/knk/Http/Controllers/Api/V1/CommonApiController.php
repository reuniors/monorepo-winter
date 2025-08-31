<?php namespace Reuniors\Knk\Http\Controllers\Api\V1;

use Illuminate\Routing\Controller;
use Reuniors\Knk\Classes\S;
use Illuminate\Http\JsonResponse;

class CommonApiController extends Controller
{
    public function generateSlug(string $title): JsonResponse
    {
        return response()->json([
            'title' => $title,
            'slug' => S::slug($title),
        ], 200);
    }

    public function generateName(string $title): JsonResponse
    {
        return response()->json([
            'title' => $title,
            'name' => S::camel($title),
        ], 200);
    }

    public function generateSlugAndName(string $title): JsonResponse
    {
        return response()->json([
            'title' => $title,
            'slug' => S::slug($title),
            'name' => S::camel($title),
        ], 200);
    }
}
