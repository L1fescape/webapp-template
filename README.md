# Webapp template

A full-stack NodeJS web application template built with [Marionette](https://github.com/marionettejs/backbone.marionette), [Browserify](https://github.com/substack/node-browserify), [Gulp](https://github.com/gulpjs/gulp), [Mongoose](https://github.com/LearnBoost/mongoose), [Express](https://github.com/strongloop/express), and [Mocha](https://github.com/visionmedia/mocha).

## Installation and running

### Build the app

Install [Nodejs](http://nodejs.org/download/), then run:

```
npm install
npm run build
```

### Run it

```
npm start
```

## Make sure things aren't broken

```
npm test
```

## Structure

After you've built the app and played around with it, you'll probably notice there are a few things you can do. You can create a new account, login, add some of your favorite soundcloud songs to a collection, delete ones you've listened to too much, and logout.

Now it's time to take a look under the hood.

First checkout `app/javascripts/main.js`. Notice this section of code:

```js
// Include modules
Application.module('home', require('./modules/home'));
Application.module('login', require('./modules/login'));
Application.module('register', require('./modules/register'));
```

Every section of the app is broken up into modules (found in `app/javascripts/modules`). The application (`app/javascripts/application/application.js`) defines how these modules interact with eachother, the application, and application data (user data, preferences, etc).

If you want to remove a module, go into that module's entry file (`index.js` in most cases) and set the property `startWithParent` to `false`. Try doing that now with the `register` module and re-building. Notice how the "Register" link in the header no longer exists. You've successfully disabled registration! Another way of disabling a module is by simply never requiring it. So you could dive into `app/javascripts/main.js` and comment out the line `Application.module('register', require('./modules/register'));`.




## Contributors
* Andrew Kennedy ([@L1fescape](https://github.com/L1fescape))
* Bjorn Stange ([@Bjorn248](https://github.com/Bjorn248))
