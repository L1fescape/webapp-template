({
  appDir: 'app',
  baseUrl: 'js',
  dir: 'dist',
  fileExclusionRegExp: /^(r|build)\.js$/,
  // Modules to stub out in the optimized file.
  stubModules: ['tpl'],
  // Inlines any text! dependencies, to avoid separate requests.
  inlineText: true,
  optimize: 'uglify2',
  optimizeCss: 'standard',
  removeCombined: true,
  preserveLicenseComments: false,
  paths: {
    templates: '../templates',
    jquery: '../libs/jquery/jquery',
    backbone: '../libs/backbone-amd/backbone',
    underscore: '../libs/underscore-amd/underscore',
    tpl: '../libs/requirejs-tpl/tpl'
  },
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
    }
  },
  modules: [{
    name: 'main'
  }],
})
