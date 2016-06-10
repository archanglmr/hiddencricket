var devMode = 'production' !== process.env.NODE_ENV,
    port = process.env.PORT || 8000,

    connect = require('connect'),
    staticFile = require('connect-static-file'),
    staticDir = require('serve-static');


console.log('Starting server in ' + (devMode ? 'development' : 'production') + ' mode');

(function() {
    'use strict';

    var server = connect(),
        sass, bourbon, reset;

    if (devMode) {
        sass = require('node-sass-middleware');
        bourbon = require('node-bourbon');
        reset = require('node-reset-scss');

        server.use('/styles', sass({
            src: __dirname + '/scss',
            response: true,
            includePaths: [bourbon.includePaths, reset.includePath]
        }));
    } else {
        server.use('/styles', staticDir(__dirname + '/styles'));
    }

    server
        .use('/assets', staticDir(__dirname + '/assets'))
        .use('/js', staticDir(__dirname + '/js'))
        .use('/', staticFile(__dirname + '/index.html'))
        .listen(port, function() {
            console.log('Server is now listening on port ' + port);
        });
}());