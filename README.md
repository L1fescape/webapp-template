# Webapp Template

A full-stack template for creating a web application with Backbone and RequireJS driving the frontend and NodeJS and MySQL powering the backend.

## Building

##### For Development:

Install [Nodejs](http://nodejs.org/download/)
Install [Bower](https://github.com/bower/bower) 

Then run:

```
npm install
bower install
```

This will install bower, install npm packages, and go out and fetch client-side libraries (jquery, backbone, etc).

##### For Production:

Install [Nodejs](http://nodejs.org/download/)
Install [Bower](https://github.com/bower/bower) 

Then run:

```
npm install
bower install
node_modules/requirejs/bin/r.js -o build.js
```

This will install npm packages, then use requirejs's `r` to optimize and build the webapp, outputting the result in the `dist` directory.

## Running

Create a file called `server/settings.js` (you can copy from the existing `server/settings.js.sample`) and modify as needed.

###### Web Server

```
node server/web.js
```

###### Mock API Server

```
node server/api.js
```

## Contributors
* Andrew Kennedy ([@L1fescape](https://github.com/L1fescape))
* Bjorn Stange ([@Bjorn248](https://github.com/Bjorn248))
