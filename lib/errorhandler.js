var app = require('flatiron').app;

module.exports = function(error, message) {
    error = JSON.stringify(error, '', '\t');
    message = message || 'Error while executing command!';

    app.log.error(message);
};
