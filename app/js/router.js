define(['backbone', 'services', 'views/header', 'views/footer', 'views/home'],
function(Backbone, Services, HeaderView, FooterView, HomeView) {
  return Backbone.Router.extend({
    prevRoute: "",

    routes: {
      '' : 'home',
    },

    initialize: function() {
      // keep track of the last route visited (useful to prevent redrawing views)
      Backbone.history.on('route', function() { this.prevRoute = window.location.hash; }, this);
      // init the header and the footer
      NAMESPACE.vPgHeader = new HeaderView();
      NAMESPACE.vPgFooter = new FooterView();
    },

    home: function() {
      // tell the previous view to close itself
      NAMESPACE.dispatcher.trigger("views:closePage");
      // draw the home view
      NAMESPACE.vPgHome = new HomeView();
    },

    routeToHome: function() {
      NAMESPACE.router.navigate('#/', {
        trigger: true
      });
    },
  });
});
