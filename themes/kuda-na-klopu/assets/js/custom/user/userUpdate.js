$(document).ready(function() {
    $('#accountCity').select2();
    var $accountDeactivateForm = $('#accountDeactivateForm');
    var $deactivateAccount = $('.deactivate-account');
    $deactivateAccount.click(function (e) {
        e.preventDefault();
        $deactivateAccount.toggleClass('inactive');
        $accountDeactivateForm.toggle();
    });
    $('.deactivate-account-dismiss').click(function (e) {
        e.preventDefault();
        $accountDeactivateForm.toggle();
        $deactivateAccount.toggleClass('inactive');
    });
});
