# twitter-oob

> A Node.js CLI app to obtain Twitter credentials in "out of band" mode

## When to use it
If you ever feel the need to write an application that needs to connect to Twitter
but you don't want to provide everything needed for a full-scale OAuth process like
callback URLs and such. (And if you want to register your app on **account A** but use it
with **account B**)

## How it works
For cases like these Twitter has a nice feature called "out of band" or obb authentication.
Using your apps *consumer key* and *consumer secret* you can generate a *request token* that
can be passed to Twitter as an URL-parameter.

Instead of performing a callback to your backend you will receive a PIN-code for verification. A PIN-code that can then be used to obtail the final *access token* and *access token secret*
