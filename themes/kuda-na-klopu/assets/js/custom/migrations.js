$(document).ready(function() {
    var $filterByCity = $('#selectCity')
    var $filterByLocation = $('#selectLocation')
    $filterByLocation.select2({
        ajax: {
            url: '/search-tags',
            dataType: 'json',
            delay: 250,
            processResults: function (data) {
                // Transforms the top-level key of the response object from 'items' to 'results'
                return {
                    results: data.items
                };
            },
            data: function (params) {
                params.citySlug = $filterByCity.val()
                params.filters = ['locations']

                return params;
            },
            cache: true
            // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
        },
        minimumInputLength: 0,
    });
});
