var OAuth = require('oauth').OAuth;

function oauth(consumerKey, consumerSecret) {
    return new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        consumerKey,
        consumerSecret,
        '1.0',
        null,
        'HMAC-SHA1');
}

exports.getRequestToken = function(consumerKey, consumerSecret, callback) {
    oauth(consumerKey, consumerSecret).getOAuthRequestToken(function(err, requestToken, requestTokenSecret) {
        if (err) {
            return callback(err);
        }

        callback(null, requestToken, requestTokenSecret);
    });
}

exports.getAccessToken = function(consumerKey, consumerSecret, requestToken, requestTokenSecret, pin, callback) {
    oauth(consumerKey, consumerSecret).getOAuthAccessToken(requestToken, requestTokenSecret, pin, function(err, accessToken, accessTokenSecret, params) {
        if (err) {
            return callback(err);
        }
        callback(null, accessToken, accessTokenSecret, params);
    });
};
