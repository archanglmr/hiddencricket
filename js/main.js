$(function() {
    "use strict";
    // @todo: figure out why it's slow as "standalone" on iphone
    // @todo: fix button size (near square)
    // @todo: fix SVG numbers (use fonts)

    var body = $('body'),
        numbers_list = $('<ul>').addClass('numbers_list'),
        dartboard_container = $('<section>').addClass('dartboard_container'),

        button_reset = $('<button>').addClass('reset').append('<i class="fa fa-angle-left"></i>'), // using font-awesome left angle here
        dartboard = false,
        sectors = {},
        i, li,

        menu = new Menu('Menu');


    // Load the board SVG. Can't really do anything with out it.
    $.get({url: 'assets/dartboard.svg', dataType: 'text'})
        .fail(function() {
            alert("Couldn't load dart board :(");
        })
        .done(function(data) {
            dartboard_container.append(data)
                .append(button_reset);
            dartboard = dartboard_container.find('svg');

            // this is in the reverse order because we want the bull and large
            // number listed first.
            for (i = 21; i > 0; i -= 1) {
                li = $('<li>').text((i === 21 ? 'Bull' : i));

                numbers_list.append(li);

                sectors[i] = (new BoardSector(i))
                    .setButton(li)
                    .setSectorSVG(find_on_dartboard(i));
            }


            // set observers
            dartboard.click(click_sector);
            numbers_list.click(click_sector);
            button_reset.click(function() {
                menu.show();
            });

            body.append(
                dartboard_container,
                $('<h2>').addClass('numbers').text('Open Numbers'),
                numbers_list,
                menu.getElement()
            );
        });

    body.addClass(window.navigator.standalone ? 'standalone' : '');

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