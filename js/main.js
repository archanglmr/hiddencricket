$(function() {
    // @todo: Must save state to local storage
    // @todo: responsive for horizontal after SCSS
    // @todo: figure out why it's slow and why there is no top padding
    // @todo: add transitions or animations to smooth it all out

    var numbers_list = $('<ul>').addClass('numbers_list'),
        dartboard = $('#dartboard_container .dartboard'),
        sectors = {},
        i,
        li;

    for (i = 21; i > 0; i -= 1) {
        li = $('<li>')
            .text((i === 21 ? 'Bull' : i));

        numbers_list.append(li);

        sectors[i] = (new BoardSector(i))
            .setButton(li)
            .setSectorSVG(find_on_dartboard(i));
    }


    // set observers
    dartboard.click(click_sector);
    numbers_list.click(click_sector);

    $('body').append(
        $('<h2>').text('Open Numbers'),
        numbers_list
    );

    //console.log(sectors);

    // localStorage.setItem(clientId + ':history', JSON.stringify(history));
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