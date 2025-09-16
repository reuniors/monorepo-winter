function isToday(dateString) {
    const today = new Date();
    const targetDate = new Date(dateString);

    return (
        today.getFullYear() === targetDate.getFullYear() &&
        today.getMonth() === targetDate.getMonth() &&
        today.getDate() === targetDate.getDate()
    );
}

const specificDate = "2025-03-07";

if (isToday(specificDate) || isToday("2025-03-07")) {
    bootbox.dialog({
        size: 'extra-large',
        onEscape: false,
        backdrop: false,
        closeButton: false,
        centerVertical: true,
        message:  $('#general-strike-template').html()
    });
}
