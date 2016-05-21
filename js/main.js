$(function() {
    // @todo: Must save state to local storage
    // @todo: click on the board itself
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
            .data('open', true)
            //.data('sector', i)
            .click(number_discovered)
            .text(' ' + (i === 21 ? 'Bull' : i) + ' ');

        numbers_list.append(li);

        sectors[i] = (new BoardSector(i))
            .setButton(li)
            .setSectorSVG(find_on_dartboard(i));
    }

    $('body')
        .append($('<h2>').text('Open Numbers'))
        .append(numbers_list);

    //console.log(sectors);

    // localStorage.setItem(clientId + ':history', JSON.stringify(history));
    //$('html')
    //    .on('touchstart', function(e) {
    //        console.log('touchstart');
    //        e.preventDefault();
    //        return false;
    //    });





    function number_discovered() {
        var li = $(this),
            sector = li.data('sector');

        if (li.data('open')) {
            li
                .data('open', false)
                .addClass('closed');
            update_sector(sector, false);
        } else {
            li
                .data('open', true)
                .removeClass('closed');
            update_sector(sector, true);
        }
    }


    /**
     * Finds the sector on the board SVG and colors it accordingly.
     *
     * @param sector
     * @param open
     */
    function update_sector(sector, open) {
        var el = find_on_dartboard(sector);

        if (open) {
            el.removeClass('closed');
        } else {
            el.addClass('closed');
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