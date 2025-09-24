<?php

namespace reuniors\knk\Http\Actions\V1\Location;

use Reuniors\Base\Http\Actions\BaseAction;

class GetGoogleLocationsJsonAction extends BaseAction
{
    protected $locationsJson = [
        "Golden trumpet" => '{"position":1,"title":"Golden trumpet","place_id":"ChIJEdYP2PedV0cRYws3ZSQgbSo","data_id":"0x47579df7d80fd611:0x2a6d202465370b63","data_cid":"3057135062743452515","reviews_link":"https://serpapi.com/search.json?data_id=0x47579df7d80fd611%3A0x2a6d202465370b63&engine=google_maps_reviews&hl=en","photos_link":"https://serpapi.com/search.json?data_id=0x47579df7d80fd611%3A0x2a6d202465370b63&engine=google_maps_photos&hl=en","gps_coordinates":{"latitude":43.7775955,"longitude":20.2270069},"place_id_search":"https://serpapi.com/search.json?engine=google_maps&google_domain=google.com&hl=en&place_id=ChIJEdYP2PedV0cRYws3ZSQgbSo","provider_id":"/g/1tfm5ftz","rating":4.4,"reviews":481,"type":"Hotel","types":["Hotel"],"type_id":"hotel","type_ids":["hotel"],"address":"Trg slobode BB, Guča 32230, Serbia","phone":"+381 62 627660","amenities":["Free Wi-Fi"],"user_review":"Accept credit cards.","thumbnail":"https://lh5.googleusercontent.com/p/AF1QipPovb8Xqe6dMBWUGm-Cet-8rPO1iQqpxPDCFJ5t=w122-h92-k-no"}',

    ];
    public function handle(array $attributes = [])
    {
        // TODO: Implement handle() method.
    }
}
