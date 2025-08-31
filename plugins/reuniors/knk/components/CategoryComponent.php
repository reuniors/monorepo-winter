<?php namespace Reuniors\Knk\Components;

use Illuminate\Http\RedirectResponse;
use Reuniors\Knk\Classes\Redirect404Exception;
use Reuniors\Knk\Facades\Globals;
use Reuniors\Knk\Models\Category;
use Redirect;
use Request;
use Cookie;

class CategoryComponent extends BaseKnkComponent
{
    public $category;
    public $city;
    protected $propertyNameCategorySlug = 'categorySlug';

    public function componentDetails()
    {
        return [
            'name'        => 'One Category',
            'description' => 'No description provided yet...'
        ];
    }

    public function defineProperties()
    {
        return [
            'categorySlug' => [
                'title'       => 'Category (slug)',
                'description' => 'Category (slug)',
                'default'     => '{{ :categorySlug }}',
                'type'        => 'string',
            ],
            'citySlug' => [
                'title'       => 'City (slug)',
                'description' => 'City (slug)',
                'default'     => '{{ :citySlug }}',
                'type'        => 'string',
            ],
            'withRedirect' => [
                'title'       => 'With redirect',
                'description' => 'With redirect',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'withLocations' => [
                'title'       => 'With locations',
                'description' => 'With locations',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'isPost' => [
                'title'       => 'Is post',
                'description' => 'Is post',
                'default'     => false,
                'type'        => 'checkbox',
            ],
            'cityWithMunicipality' => [
                'title'       => 'City with municipality',
                'description' => 'City with municipality',
                'default'     => false,
                'type'        => 'checkbox',
            ],
        ];
    }

    public function onRunOriginal()
    {
        if ($this->property('isPost') && Request::isMethod('post')) {
            $category = $this->getCategory();
            if ($category instanceof RedirectResponse) {
                return $category;
            }
            $city = $this->getCity();
            $this->category = $this->page['category'] = $category;
            $this->city = $this->page['city'] = $city;
        } else {
            $this->category = $this->getCategory();
            $this->city = $this->page['city'] = $this->getCity();
            if (get('saveCity')) {
                $citySlug = $this->property('citySlug');
                if ($citySlug) {
                    $cookie = Cookie::forever('citySlug', $citySlug);
                    Cookie::queue($cookie);
                }
            }
        }
    }

    public function getCategory()
    {
        $withRedirect = $this->property('withRedirect');
        $postCategorySlug = post('category');
        $categorySlug = !empty($postCategorySlug)
            ? $postCategorySlug : $this->property('categorySlug');

        $postCitySlug = post('city');
        $postTags = post('tags_filters');
        $citySlug = !empty($postCitySlug )
            ? $postCitySlug : $this->property('citySlug');
        if (
            $withRedirect
            && (!empty($postCategorySlug) || !empty($postCitySlug))
        ) {
            if (empty($categorySlug)) {
                $categorySlug = trans('gde-jesti');
            }
            $url = $this->controller->pageUrl('location/p20-locations-list', [
                'citySlug' => $citySlug,
                'categorySlug' => $categorySlug
            ]);
//            $cityMunicipalities = CacheData::get('cities-municipalities', 24);
//            if ($cityMunicipalities[$citySlug]) {
//                $url = $this->controller->pageUrl('location/p10-locations-municipality', [
//                    'citySlug' => $cityMunicipalities[$citySlug],
//                    'municipalitySlug' => $citySlug,
//                    'categorySlug' => $categorySlug
//                ]);
//            } else {
//                $url = $this->controller->pageUrl('location/p20-locations-list', [
//                    'citySlug' => $citySlug,
//                    'categorySlug' => $categorySlug
//                ]);
//            }
            $tags = !empty($postTags)
                ? '?' . implode('&', array_map(function ($tagValue) {
                    return 'tags=' . $tagValue;
                }, $postTags)) . '&'
                : '?';
            return Redirect::to($url . $tags . 'saveCity=1');
        }
        $categoryData = Category::getFE([
            'citySlug' => $citySlug,
            'categorySlug' => $categorySlug,
            'withRedirect' => $this->property('withRedirect'),
            'withLocations' => $this->property('withLocations'),
            'tagsFilters' => post('tags_filters')
        ])->first();
        if (empty($categoryData)) {
            throw new Redirect404Exception();
        }
        return $categoryData->toArray();
    }

    public function getCity()
    {
        $cityData = Globals::currentCity();
        if (!empty($cityData)) {
            $cityData->load('cities');
        }
        return $cityData
            ? $cityData->toArray()
            : null;
    }
}
