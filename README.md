# Webapp Template

A full-stack template for creating a web application with BackboneJS and RequireJS driving the frontend and NodeJS and MySQL powering the backend.


## Structure

- **server/**
 - **api.js** - API server
 - **web.js** - Static file server
- **app/**: All static files for the frontend.
 - **libs/**: Created once `Bower` is run. Libraries used on the frontend.
- **dist/**: Created once the frontend app is built for production using `r`.

## Building

##### For Development:

- Install [Nodejs](http://nodejs.org/download/)
- Install [Bower](https://github.com/bower/bower) 

Then run:

```
npm install
bower install
```

This will install npm packages and go out and fetch client-side libraries (jquery, backbone, etc).

##### For Production:

- Install [Nodejs](http://nodejs.org/download/)
- Install [Bower](https://github.com/bower/bower) 

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
