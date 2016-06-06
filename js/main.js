$(function() {
    "use strict";

    var body = $('body'),
        numbers_list = $('<nav>').addClass('numbers_list'),
        dartboard_container = $('<section>').addClass('dartboard_container'),

        button_menu = $('<button>').addClass('menu').append('<'), //.append('<i class="fa fa-angle-left"></i>'), // using font-awesome left angle here
        dartboard = false,
        sectors = {},

        help_panel = build_help(),
        menu = build_menu(),
        standalone_mode = !!window.navigator.standalone, // is this in the app/standalone mode?
        button_press_event = standalone_mode ? 'touchend' : 'click';


    // Load the board SVG. Can't really do anything with out it.
    $.get({url: 'assets/dartboard.svg', dataType: 'text'})
        .fail(function() {
            alert("Couldn't load dart board :(");
        })
        .done(function(data) {
            var i, button;

            dartboard_container.append(data, button_menu);
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
            button_menu.on(button_press_event, function() {
                menu.show();
            });

            body.append(
                dartboard_container,
                $('<h2>').addClass('numbers').text('Open Numbers'),
                numbers_list,
                menu.getElement(),
                help_panel.getElement()
            );
        });

    body.addClass(standalone_mode ? 'standalone' : '');


    //document.addEventListener("touchstart", function(){}, true);
    //$('body').bind('touchend', function() {});

    //$('html')
    //    .on('touchstart', function(e) {
    //        console.log('touchstart');
    //        e.preventDefault();
    //        return false;
    //    });


    /**
     * Builds the instructional help menu.
     *
     * @returns {InfoPanel}
     */
    function build_help() {
        var help = new InfoPanel();

        help.addCloseButton()
            .addElement('<h2>What is this?</h2>')
            .addElement('<p>Keeps track of the numbers found in a game of Hidden Cricket (because I have a horrible memory).</p>')

            .addElement('<h2>Directions</h2>')
            .addElement('<p>As players throw at a real life dartboard tap the graphic or number in the list to  check it off. What\'s left is a visual of undiscovered numbers to aim for.</p>');

        return help;
    }

    /**
     * Builds the game menu.
     *
     * @returns {Menu}
     */
    function build_menu() {
        var menu = new Menu('Menu');


        menu.addButton('What is this?', function() {
            help_panel.show();
        });
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
        }).addClass('continue');

        return menu;
    }


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