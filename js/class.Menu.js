/**
 * Game Menu class
 *
 * @constructor
 */
function Menu(title) {
    "use strict";

    var el = $('<section>').addClass('menu');


    // PUBLIC METHODS
    this.show = function() {
        el.addClass('visible');
        return this;
    };
    this.hide = function() {
        el.removeClass('visible');
        return this;
    };
    this.addButton = function(title, callback) {
        var button = $('<button>');

        button.text(title);
        if (callback) {
            button.on(window.navigator.standalone ? 'touchend' : 'click', callback);
        }

        el.append(button);
        return button;
    };

    this.getElement = function() {
        return el;
    };


    // CONSTRUCTOR SETUP

    if (title) {
        el.append($('<h2>').text(title));
    }


    // PRIVATE METHODS
}