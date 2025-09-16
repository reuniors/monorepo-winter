var LocationList = function () {
    var self = {
        formRequest: null,
        parent_id: null,
        $attachment_id: '#relatedAttachmentId',
        $attachment_field: '#relatedAttachmentField',
        formName: '#mainForm',
        $form: $('#mainForm'),
        cancelName: '#cancel-comment-reply-link',
        commentWrapName: '#wrap-comment-form',
        messageName: '#comment_flash_message',
    };
    return {

        load: function (url, data, callbackMethod) {
            if (self.formRequest) {
                self.formRequest.abort()
            }
            var formData = {}
            if (data) {
                formData = data
            }

            self.formRequest = self.$form.request2('locationsList::onRun', {
                url: url,
                update: {
                    'components/location/list': '#locationsData',
                    'infinityLoadLocations': '#infinityLoadLocations',
                },
                data: formData,
                evalSuccess: (function () {
                    if (callbackMethod) {
                        return callbackMethod
                    }
                })()
            });
        },

        cancel: function () {
            self.parent_id = null;
            this.clearMessage();
            $(self.cancelName).hide();
            $(self.commentWrapName).html($(self.commentName));

        }
    }
}();

