$(document).ready(function() {
    $('.select-2-header-dropdown').select2({
        dropdownCssClass: "header-search-location-dropdown",
        language: {
            errorLoading: function () {
                return homeLabels.select2.errorLoading;
            },
            inputTooShort: function (num) {
                return homeLabels.select2.inputTooShort_1 + num + homeLabels.select2.inputTooShort_2;
            },
            noResults: function () {
                return homeLabels.select2.noResults;
            },
        }
    }).on('select2:open', function (e) {
        if (window.mobileCheck) {
            $('.select2-search input').prop('focus', false);
        }
    });
});
