// JavaScript source code
/* =========================================
TRACKING CLICK
========================================= */

document.addEventListener('click', function (e) {

    const button =
        e.target.closest('.track-click');

    if (!button) return;

    const eventName =
        button.dataset.event;

    if (!eventName) return;

    if (window.dataLayer) {

        window.dataLayer.push({

            event: eventName

        });

    }

});