'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
  },
  paths: {
    templates: '../templates',
    jquery: '../libs/jquery/jquery',
    backbone: '../libs/backbone-amd/backbone',
    underscore: '../libs/underscore-amd/underscore',
    tpl: '../libs/requirejs-tpl/tpl'
  }
});

require(['backbone', 'services', 'router'], function (Backbone, Services, Router) {
  $(document).ready(function() {
    // create the main app router
    var router = new Router();
    Backbone.history.start();
  });
});
