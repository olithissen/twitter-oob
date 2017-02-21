var flatiron = require('flatiron');
var authflow = require('./lib/authflow');
var errorhandler = require('./lib/errorhandler');

var app = flatiron.app;

app.use(flatiron.plugins.cli, {
    dir: __dirname,
    usage: [
        'This is a basic flatiron cli application example!',
        '',
        'hello - say hello to somebody.'
    ]
});

app.cmd('auth', function() {
    app.prompt.get([{
        name: 'consumerkey',
        message: 'Consumer Key',
        required: true
    }, {
        name: 'consumersecret',
        message: 'Consumer Secret',
        required: true
    }], function(err, result) {
        if (err) {
            return errorhandler(err);
        }

        var consumerkey = result.consumerkey;
        var consumersecret = result.consumersecret;

        authflow.getRequestToken(consumerkey, consumersecret, function(err, requestToken, requestTokenSecret) {
            if (err) {
                return errorhandler(err);
            }

            var url = 'https://twitter.com/oauth/authorize?oauth_token=' + requestToken;

            app.log.info('Success! Please visit this link in your favourite browser:');
            app.log.info(url.grey);

            app.prompt.get([{
                name: 'pin',
                message: 'PIN',
                pattern: /^[0-9]{7}$/,
                required: true
            }], function(err, result) {
                authflow.getAccessToken(consumerkey, consumersecret, requestToken, requestTokenSecret, result.pin, function(err, accessToken, accessTokenSecret, params) {
                    if (err) {
                        return errorhandler(err);
                    }

                    app.log.info('@' + params.screen_name.grey);
                    app.log.info(accessToken.grey);
                    app.log.info(accessTokenSecret.grey);
                });
            });
        });
    });
})

app.start();
