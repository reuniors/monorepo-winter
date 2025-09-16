var tabsHistory = []
var infoPageInit = function () {
    initLocationMap()
    $(".restaurants-type-slider").owlCarousel({
        items: 2,
        margin: 10,
        stagePadding: 20,
        dots: true,
        autoplay: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:2
            }
        }
    });
    $(".banner-delivery-slider").owlCarousel({
        items: 2,
        margin: 10,
        stagePadding: 20,
        dots: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });
    $('.other-reviews').click(function () {
        $('#nav-reviews-tab').tab('show')
        window.scrollToElement($('#nav-tab'))
    })

    // $(".restaurants-locations-slider").owlCarousel({
    //     items: 1,
    //     margin: 10,
    //     stagePadding: 40,
    //     dots: true,
    //     responsive: false,
    //     autoplay: false,
    // });
    if (window.mobileCheck) {
        $('#mobileLocationWrapper').append(
            $('#restaurantLocationData')
        )
    }
}
var scrollToNavMenu = function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#nav-tab").offset().top
    }, 1000);
}
var handleScroll = () => {
    var throttleTimer;
    var $lastActive;
    var $foodMenuList = $('#FoodMenuList');

    var throttleFunction = function(event) {
        if (throttleTimer) return;

        throttleTimer = setTimeout(function() {

            // Your existing scroll logic here
            var $activeItem = $('.food-list-item a.active');
            if ($activeItem.length && $activeItem[0] !== $lastActive) {
                $lastActive = $activeItem[0];
                // Get the current scroll position of $foodMenuList
                var currentScrollLeft = $foodMenuList.scrollLeft();

                // Calculate the correct scroll position
                var activeItemStart = $activeItem.offset().left;
                var foodMenuListStart = $foodMenuList.offset().left;
                var scrollPosition = currentScrollLeft + (activeItemStart - foodMenuListStart) - 120;

                $foodMenuList.animate({ scrollLeft: scrollPosition }, 300);
            }
            throttleTimer = null;

        }, 300); // Adjust the delay as needed, 100ms is a common choice
    };

    $(window).scroll(throttleFunction);
}
var menuPageInit = function () {
    $('.food-advance').click(function () {
        var $this = $(this)
        var foodName = $this.data('name')
        foodAdvanceDialog = bootbox.dialog({
            title: null,
            onEscape: true,
            backdrop: true,
            message: `<div id="foodAdvancedPopup">\
                <div data-bind="template: { name: \'food-popup-template\', data: currentData }">\
                    <a class="text-muted oc-loading">${dataLabels.loading}</a>\
                </div>\
            </div>`
        });
        newViewModel.initCreateCurrentData(foodName)
        var bindAddonsModal = function (viewModal) {
            ko.applyBindings(newViewModel, $('#foodAdvancedPopup')[0]);
        }
        foodAdvanceDialog.on('shown.bs.modal', function (e) {
            if (newViewModel.foodList[foodName].foodAddonGroups.length === 0) {
                $.request('foodMenuData::onShowFoodAdvance', {
                    data: {
                        foodId: newViewModel.currentData.id
                    },
                    success: function (response) {
                        hideTooltip()
                        newViewModel.currentData.transformFoodAddonsGroups(response.food_addon_groups)
                        newViewModel.foodList[foodName].foodAddonGroups = newViewModel
                            .currentData
                            .foodAddonGroups
                        bindAddonsModal(newViewModel)
                    }
                })
            } else {
                bindAddonsModal(newViewModel)
            }
        });
    })
    $("#FoodMenuList a.nav-item").click(function (event) {
        event.preventDefault();
        $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top}, 500);
    });

    if (window.mobileCheck) {
        var navbar = document.getElementById("FoodMenuList");
        var sticky = getOffsetTop(navbar);
        var $menuDataWrapper = $("#MenuDataWrapper");
        window.onscroll = function () {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky-fixed")
                navbar.classList.remove("d-none")
            } else {
                navbar.classList.remove("sticky-fixed");
                navbar.classList.add("d-none")
            }
        };
        if ($menuDataWrapper.offset()) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $menuDataWrapper.offset().top
            }, 1000);
        }
        handleScroll()
    } else {
        scrollToNavMenu()
    }
    initFoodData()
}
var reviewPageInit = function () {
    $('.kv-ltr-theme-fas-star-2').rating({
        theme: 'krajee-fas',
        showCaption: false,
        showClear: false,
        clearButton: 'reset',
        starCaptions: {
            0: '0', 1: '5', 2: '6', 3: '7', 4: '8', 5: '9', 6: '10'
        },
        min: 0,
        max: 6,
        step: 1,
        stars: 6,
        hoverOnClear: false,
        clearCaption: '',
    });
    $('.kv-ltr-theme-fas-star').rating({
        theme: 'krajee-fas',
        showCaption: false,
        clearButton: 'reset',
        starCaptions: {0: '0', 1: '5', 2: '6', 3: '7', 4: '8', 5: '9', 6: '10'},
        min: 0,
        max: 6,
        step: 1,
        stars: 6,
        hoverOnClear: false,
        clearCaption: '',
    }).on('rating:change', function(event, value, caption) {
        var ratingType = $(event.target).data('ratingtype')
        $.request('locationData::onRating', {
            url: oneLocationPage,
            data: {location_id: locationId, type: ratingType, rating_general: parseInt(value) + 4},
        })
    }).on('rating:clear', function(event) {
        var ratingType = $(event.target).data('ratingtype')
        $.request('locationData::onRating', {
            url: oneLocationPage,
            data: {location_id: locationId, type: ratingType, rating_general: 0},
        })
    });
    $('.other-reviews').click(function () {
        $('#nav-reviews-tab').trigger('click')
        $(window).scrollTop($("#nav-tab").offset().top)
    })
}
var galleryPageInit = function () {
    $galleryImagesWrapper = $(".gallery-images-wrapper");
    $galleryImagesWrapper.lightGallery({
        selector: '.one-gallery-image'
    });
    var mixer = mixitup('#nav-gallery', {
        selectors: {
            control: '[data-mixitup-control]'
        }
    });
    if (triggerGalleryIndex !== null) {
        $('.gallery-images-wrapper .one-gallery-image:nth-child(' + triggerGalleryIndex + ')').trigger('click');
        triggerGalleryIndex = null;
    }
}
var changeTab = function ($target) {
    if (!$target.hasClass('data-loaded')) {
        $target.request2('locationData::' + $target.data('method'), {
            url: locationPage,
            evalSuccess: (function () {
                tabsHistory.push(activeTab)
                activeTab = $target.data('tab');
                return activeTab + 'PageInit()';
            })()
        })
        $target.addClass('data-loaded')
    } else {
        $target.historyPushState()
    }
}

$(document).ready(function () {
    $galleryImagesWrapper = $(".gallery-images-wrapper");
    var $galleryTabLink = $('#nav-gallery-tab');

    $('.open-gallery-image').click(function (e) {
        e.preventDefault();
        var imageIndex = $(this).data('index') + 1;
        if ($galleryImagesWrapper.length > 0) {
            $('.gallery-images-wrapper .one-gallery-image:nth-child(' + imageIndex + ')').trigger('click');
        } else {
            triggerGalleryIndex = imageIndex;
            $galleryTabLink.tab('show')
        }
    });

    $('#OpenGalleryImages').click(function (e) {
        e.preventDefault()
        if ($galleryImagesWrapper.length > 0) {
            $('.one-gallery-image', $galleryImagesWrapper).trigger('click');
        } else {
            triggerGalleryIndex = 0;
            $galleryTabLink.tab('show')
        }
    });

    // Javascript to enable link to tab
    var url = document.location.toString();
    // if (url.match('#')) {
    //     $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
    // }
    // With HTML5 history API, we can easily prevent scrolling!
    $('.nav-tabs a').on('shown.bs.tab', function (e) {
        var $target = $(e.target)
        changeTab($target)
    })
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    eval(loadedPage + 'PageInit()');

    window.onpopstate = function (event) {
        window.location.reload()
    };
});

function resetTooltip() {
    var $tooltips = $('[data-toggle="tooltip"]')
    $tooltips.tooltip('dispose')
    $tooltips.tooltip()
}

function hideTooltip() {
    var $tooltips = $('[data-toggle="tooltip"]')
    $tooltips.tooltip('hide')
}

var map
var marker

function initLocationMap() {
    if (addressLat && addressLong) {
        if (window.mobileCheck) {
            map = L.map('mapOpenStreet', {
                dragging: false,
                tap: false
            })
        } else {
            map = L.map('mapOpenStreet')
        }
        map.setView([addressLat, addressLong], 15)
        var mapLink =
            '<a href="/">KNK</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        marker = L.marker([addressLat, addressLong]).addTo(map)
    }
}

function setLocationMarker(addressLat, addressLong) {
    if (marker) {
        map.removeLayer(marker);
    }
    if (addressLat && addressLong) {
        map.setView([addressLat, addressLong], 15)
        marker = L.marker([addressLat, addressLong]).addTo(map)
    }
}

function isBody(el) {
    return document.body === el;
}

const getOffsetTop = function (element) {
    let offsetTop = 0;
    while (element && !isBody(element)) {
        if (element.offsetTop > offsetTop) {
            offsetTop = element.offsetTop;
        }
        element = element.parentElement;
    }
    return offsetTop;
}
