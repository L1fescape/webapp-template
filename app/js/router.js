define(['backbone', 'services', 'events', 'views/header', 'views/footer', 'views/home', 'views/about'],
function(Backbone, Services, Events, HeaderView, FooterView, HomeView, AboutView) {
  return Backbone.Router.extend({
    prevRoute: "",

    routes: {
      '' : 'home',
      'about' : 'about'
    },

    initialize: function() {
      // keep track of the last route visited (useful to prevent redrawing views)
      Backbone.history.on('route', function() { this.prevRoute = window.location.hash; }, this);
      // init the header and the footer
      this.vPgHeader = new HeaderView();
      this.vPgFooter = new FooterView();
    },

    home: function() {
      // tell the previous view to close itself
      Events.trigger("views:closePage");
      // draw the home view
      this.vPgBody = new HomeView();
    },
    
    about: function() {
      // tell the previous view to close itself
      Events.trigger("views:closePage");
      // draw the about view
      this.vPgBody = new AboutView();
    },

    routeToHome: function() {
      this.navigate('#/', {
        trigger: true
      });
    },
  });
});
