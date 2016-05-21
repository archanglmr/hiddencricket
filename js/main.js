$(function() {
    "use strict";
    // @todo: figure out why it's slow
    // @todo: add "new game" button

    var body = $('body'),
        numbers_list = $('<ul>').addClass('numbers_list'),
        dartboard_container = $('<section>').addClass('dartboard_container'),

        dartboard = false,
        sectors = {},
        i, li;


    // Load the board SVG. Can't really do anything with out it.
    $.get({url: 'assets/dartboard.svg', dataType: 'text'})
        .fail(function() {
            alert("Couldn't load dart board :(");
        })
        .done(function(data) {
            dartboard_container.append(data);
            dartboard = dartboard_container.first();

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

            body.append(
                dartboard_container,
                $('<h2>').text('Open Numbers'),
                numbers_list
            );
        });

    body.addClass(window.navigator.standalone ? 'standalone' : '');


    //$('html')
    //    .on('touchstart', function(e) {
    //        console.log('touchstart');
    //        e.preventDefault();
    //        return false;
    //    });


    /**
     * Event handler for the board and list of numbers
     *
     * @param e Event
     */
    function click_sector(e) {
        var el = $(e.target),
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