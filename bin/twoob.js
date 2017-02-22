#!/usr/bin/env node

var twoob = require('../src/index.js');

twoob.start(function (err) {
    if (!err) {
        twoob.log.info('Goodbye.'.grey);
    }

    process.exit(err ? 1 : 0);
});
