var sass = require('node-sass'),
    bourbon = require('node-bourbon'),
    reset = require('node-reset-scss'),
    fs = require('fs');


console.log('Rendering main.scss');
sass.render({
    file: __dirname + '/scss/main.scss',
    includePaths: [bourbon.includePaths, reset.includePath],
    outputStyle: 'compressed'
}, function(error, result) {
    'use strict';

    if (error) {
        console.log('COMPILE ERROR: ' + error);
    } else {
        console.log('Writing file: main.css');
        fs.writeFile(__dirname + '/styles/main.css', result.css, function(error) {
            if (error) {
                console.log('WRITE ERROR: ' + error);
            } else {
                console.log('Write successful!');
                console.log('feel free to run in production mode now:');
                console.log('> npm run production');
            }
        });
    }
});
