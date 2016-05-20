$(function() {
    // @todo: Must save state to local storage
    // @todo: click on the board itself
    // @todo: responsive for horizontal after SCSS
    // @todo: figure out why it's slow and why there is no top padding
    // @todo: add transitions or animations to smooth it all out

    var numbers_list = $('<ul>').addClass('numbers_list'),
        i = 21,
        all_numbers = [],
        li;

    for (i; i > 0; i -= 1) {
        li = $('<li>')
            .data('open', true)
            .data('target', i)
            .addClass('open')
            .click(number_discovered)
            .text(' ' + (i === 21 ? 'Bull' : i) + ' ');

        all_numbers.push(li);
        numbers_list.append(li);
    }

    $('body')
        .append($('<h2>').text('Open Numbers'))
        .append(numbers_list);
    //$('html')
    //    .on('touchstart', function(e) {
    //        console.log('touchstart');
    //        e.preventDefault();
    //        return false;
    //    });





    function number_discovered() {
        var li = $(this),
            target = li.data('target');

        if (li.data('open')) {
            li
                .data('open', false)
                .addClass('closed');
            update_target(target, false);
        } else {
            li
                .data('open', true)
                .removeClass('closed');
            update_target(target, true);
        }
    }


    /**
     * Finds the row on the slice on the board SVG and colors it accordingly.
     *
     * @param target
     * @param open
     */
    function update_target(target, open) {
        var el = find_on_target(target);
        //if (21 === target) {
        //    el = $('#bull');
        //} else {
        //    el = $('#s' + target + ', #d' + target + ', #t' + target);
        //}

        if (open) {
            el.removeClass('closed');
        } else {
            el.addClass('closed');
        }
    }


    /**
     * Finds the row on the slice on the board SVG and returns the element.
     *
     * @param num
     */
    function find_on_target(num) {
        var el;
        if (21 === num) {
            el = $('#bull');
        } else {
            el = $('#s' + num + ', #d' + num + ', #t' + num);
        }
        return el;
    }
});
