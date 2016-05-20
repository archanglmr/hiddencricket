$(function() {
    var open_numbers = $('<ul>').addClass('numbers_list open_numbers'),
        closed_numbers = $('<ul>').addClass('numbers_list closed_numbers'),
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
        open_numbers.append(li);
    }

    $('body')
        .append($('<h2>').text('Open Numbers'))
        .append(open_numbers)
        .append($('<h2>').text('Closed Numbers'))
        .append(closed_numbers);






    function number_discovered() {
        var li = $(this),
            target = li.data('target');

        if (li.data('open')) {
            li
                .data('open', false)
                .removeClass('open');
            closed_numbers
                .prepend(li);

            update_target(target, false);
        } else {
            li
                .data('open', true)
                .addClass('open');
            update_open();
            update_target(target, true);
        }
    }


    function update_open() {
        var i, c;

        for (i = 0, c = all_numbers.length; i < c; i += 1) {
            if (all_numbers[i].data('open')) {
                open_numbers.append(all_numbers[i]);
            }
        }
    }

    function update_target(target, open) {
        var el;
        if (21 === target) {
            el = $('#bull');
        } else {
            el = $('#s' + target + ', #d' + target + ', #t' + target);
        }

        //console.log('#' + ((21 === target) ? 'Bull' : ('s' + target)));
        //var el = $('#' + ((21 === target) ? 'Bull' : ('s' + target)));

        el.css('opacity', open ? 1 : .25);
    }
});
