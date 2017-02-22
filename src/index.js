var flatiron = require('flatiron');
var authflow = require('./lib/authflow');
var errorhandler = require('./lib/errorhandler');

var app = module.exports = flatiron.app;

app.use(flatiron.plugins.cli, {
    dir: __dirname,
    usage: [
        'Welcome to twitter-oob',
        '',
        'auth - Generate accessToken and accessTokenSecret using "out of band mode"'
    ]
});

app.cmd('auth', function() {
    app.prompt.get([{
        name: 'consumerkey',
        pattern: /^[a-zA-Z0-9]{25}$/,
        message: 'The Consumer Key is a 25 digit string',
        description: 'Your app\'s Consumer Key',
        required: true
    }, {
        name: 'consumersecret',
        pattern: /^[a-zA-Z0-9]{50}$/,
        message: 'The Consumer Secret is a 50 digit string',
        description: 'Your app\'s Consumer Secret',
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

            app.log.info('Copy and paste this URL into your browser:');
            app.log.info(url.grey);

            app.prompt.get([{
                name: 'pin',
                description: 'The PIN you just saw on Twitter',
                pattern: /^[0-9]{7}$/,
                required: true
            }], function(err, result) {
                authflow.getAccessToken(consumerkey, consumersecret, requestToken, requestTokenSecret, result.pin, function(err, accessToken, accessTokenSecret, params) {
                    if (err) {
                        return errorhandler(err);
                    }

                    app.log.info(('Successfully authenticated @' + params.screen_name).white);
                    app.log.info(('AccessToken: ' + accessToken).yellow);
                    app.log.info(('accessTokenSecret: ' + accessTokenSecret).yellow);
                });
            });
        });
    });
})
