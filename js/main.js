$(function() {
    "use strict";
    // @todo: fix SVG numbers (use fonts)
    // @todo: Add directions to menu, maybe reposition menu buttons a bit

    var body = $('body'),
        numbers_list = $('<nav>').addClass('numbers_list'),
        dartboard_container = $('<section>').addClass('dartboard_container'),

        button_reset = $('<button>').addClass('reset').append('<i class="fa fa-angle-left"></i>'), // using font-awesome left angle here
        dartboard = false,
        sectors = {},

        menu = new Menu('Menu'),
        standalone_mode = !!window.navigator.standalone, // is this in the app/standalone mode?
        button_press_event = standalone_mode ? 'touchend' : 'click';


    // Load the board SVG. Can't really do anything with out it.
    $.get({url: 'assets/dartboard.svg', dataType: 'text'})
        .fail(function() {
            alert("Couldn't load dart board :(");
        })
        .done(function(data) {
            var i, button;

            dartboard_container.append(data, button_reset);
            dartboard = dartboard_container.find('svg');

            // this is in the reverse order because we want the bull and large
            // number listed first.
            for (i = 21; i > 0; i -= 1) {
                button = $('<button>').text((i === 21 ? 'Bull' : i));

                numbers_list.append(button);

                sectors[i] = (new BoardSector(i))
                    .setButton(button)
                    .setSectorSVG(find_on_dartboard(i));
            }


            // set observers
            dartboard.on(button_press_event, click_sector);
            numbers_list.on(button_press_event, click_sector);
            button_reset.on(button_press_event, function() {
                menu.show();
            });

            body.append(
                dartboard_container,
                $('<h2>').addClass('numbers').text('Open Numbers'),
                numbers_list,
                menu.getElement()
            );
        });

    body.addClass(standalone_mode ? 'standalone' : '');

    menu.addButton('New Game', function() {
        var i;
        for (i in sectors) {
            if (sectors.hasOwnProperty(i)) {
                sectors[i].open();
            }
        }
        menu.hide();
    });
    menu.addButton('Continue', function() {
        menu.hide();
    });
    //menu.addButton('What is this?');


    //document.addEventListener("touchstart", function(){}, true);
    //$('body').bind('touchend', function() {});

    //$('html')
    //    .on('touchstart', function(e) {
    //        console.log('touchstart');
    //        e.preventDefault();
    //        return false;
    //    });


    /**
     * Event handler for the board and list of numbers
     *
     * @param event
     */
    function click_sector(event) {
        var el = $(event.target),
            sector = false;

        if (!(sector = el.data('sector'))) {
            sector = el.parent().data('sector');
        }

        if (sector && sectors[sector]) {
            sectors[sector].toggleOpen();
        }
    }


    /**
     * Finds the sector on the board SVG and returns the element.
     *
     * @param sector
     */
    function find_on_dartboard(sector) {
        return dartboard.find('.sector_' + (21 === sector ? 'bull' : sector));
    }
});