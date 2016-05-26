/**
 * Info Panel class
 *
 * @constructor
 */
function InfoPanel() {
    "use strict";

    var el = $('<section>').addClass('info_panel'),
        close_button = null;


    // PUBLIC METHODS
    this.show = function() {
        el.addClass('visible');
        return this;
    };

    this.hide = function() {
        el.removeClass('visible');
        return this;
    };

    this.addCloseButton = function() {
        if (null === close_button) {
            close_button = $('<button>')
                .addClass('close')
                .append('<i class="fa fa-times-circle"></i>'); // using font-awesome times-circle for a close button

            close_button.on(
                (window.navigator.standalone ? 'touchend' : 'click'),
                (function(_this) {
                    return function() {
                        _this.hide();
                    };
                })(this)
            );

            el.append(close_button);
        }
        return this;
    };

    this.addElement = function(element) {
        el.append(element);

        return this;
    };

    this.getElement = function() {
        return el;
    };


    // CONSTRUCTOR SETUP


    // PRIVATE METHODS
}