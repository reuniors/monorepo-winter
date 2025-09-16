(function ($) { "use strict";
    $.fn.historyPushState = function ($dataSuccess) {
        var $el = $(this)
        var $dataHistoryUrl = $el.data('request-history-url')
        window.history.pushState({}, '', $dataHistoryUrl)
        if ($dataSuccess) {
            eval($dataSuccess)
        }
    }
    $.fn.request2 = function(handler, option) {
        var $this = $(this).first()
        if ($this.data('request-history-url')) {
            var $dataSuccess = $this.data('request-success')
            $dataSuccess = $dataSuccess ? $dataSuccess : ''
            if (option.evalSuccess) {
                option.evalSuccess = `$el.historyPushState(${option.evalSuccess})`
            } else {
                $this.data('request-success', `$el.historyPushState(${$dataSuccess})`)
            }
        }
        return $this.request(handler, option)
    };
})(jQuery);