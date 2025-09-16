$(document).ready(function() {
    $('.right-choose-language .dropdown-menu .dropdown-item').click(function (e) {
        e.preventDefault();
        var sHref = $(this).attr('href');
        var $languageSelect = $('.right-choose-language select');
        $languageSelect.val(sHref).trigger('change');
    });

    $('.btn-user-login').on('click', function (event) {
        event.preventDefault()
        bootbox.dialog({
            title: standardLabels.user,
            size: 'large',
            onEscape: true,
            backdrop: true,
            message:  $('#hidden-template').html()
        });
    });

    $('a.order-online').on('click', function (event) {
        // event.preventDefault()
        // var $this = $(this)
        // var $parentElement = $this.closest('.one-restaurant-wide');
        // var $iframe = $('<iframe></iframe>')
        //     .addClass('iframe-fullscreen')
        //     .attr('src', 'dostava.kudanaklopu.com')
        // console.log($this.attr('href'), $iframe)
        // bootbox.dialog({
        //     title: $('.title a', $parentElement).html(),
        //     size: 'large',
        //     onEscape: true,
        //     backdrop: true,
        //     message:  $iframe,
        //     className: "modal-100"
        // });
    });
});
