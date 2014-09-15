# Webapp template

A full-stack NodeJS web application template built with [Marionette](https://github.com/marionettejs/backbone.marionette), [Browserify](https://github.com/substack/node-browserify), [Gulp](https://github.com/gulpjs/gulp), [Mongoose](https://github.com/LearnBoost/mongoose), [Express](https://github.com/strongloop/express), and [Mocha](https://github.com/visionmedia/mocha).

## Instructions

1. Install [Nodejs](http://nodejs.org/download/).
2. Clone the source from `https://github.com/akenn/webapp-template`
3. Install dependencies: `npm install`
4. Build it: `npm run build`
5. Test everything: `npm test`
6. Start the webserver: `npm start`

## Structure

After you've built the app and played around with it, you'll probably notice there are a few things you can do. You can create a new account, login, add some notes, delete notes, and logout.

Now it's time to take a look under the hood.

First checkout `app/javascripts/main.js`. Notice this section of code:

```js
// Include modules
Application.module('home', require('./modules/home'));
Application.module('login', require('./modules/login'));
Application.module('register', require('./modules/register'));
```

Every section of the app is broken up into modules (found in `app/javascripts/modules`). The application (`app/javascripts/application/application.js`) defines how these modules interact with eachother, the application, and application data (user data, preferences, etc).

If you want to remove a module, simply remove it from `main.js` and re-build. 
