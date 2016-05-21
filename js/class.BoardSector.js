/**
 * BoardSector class
 *
 * @constructor
 */
function BoardSector(id) {
    var open = true;

    var _sector = false;
    var _single;
    var _double;
    var _triple;

    var _button = false;


    // PUBLIC METHODS
    this.setSectorSVG = function(el) {
        _sector = _single = _double = _triple = false;

        if (el) {
            _sector = el;
            _single = _sector.find('single');
            _double = _sector.find('double');
            _triple = _sector.find('triple');

            _sector.data('sector', id);
            _single.data('sector', id);
            _double.data('sector', id);
            _triple.data('sector', id);
        }
        update_el(_sector);

        return this;
    };

    this.setButton = function(el) {
        _button = el || false;

        if (el) {
            _button.data('sector', id);
        }
        update_el(_button);

        return this;
    };

    this.isOpen = function() {
        return open;
    };

    this.open = function() {
        open = true;
        update_el(_sector);
        update_el(_button);

        return this;
    };

    this.close = function() {
        open = false;
        update_el(_sector);
        update_el(_button);

        return this;
    };

    this.toggleOpen = function() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    };

    // CONSTRUCTOR SETUP


    // PRIVATE METHODS
    function update_el(el) {
        if (el) {
            if (open) {
                el.removeClass('closed').addClass('open');
            } else {
                el.removeClass('open').addClass('closed');
            }

        }
    }
}