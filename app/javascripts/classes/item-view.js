'use strict';
var Marionette = require('backbone.marionette'),
  BabySitter = require('backbone.babysitter');

module.exports = Marionette.ItemView.extend({
  constructor: function(){
    this.children = new BabySitter();
    this.on('show', this._triggerShowChildren);
    this.on('render', this._renderChildren, this);

    Marionette.ItemView.apply(this, arguments);
  },

  // Child view functions

  addChildView : function(view){
    this.children.add(view);

    // TODO only render if the parent view is open
    this._renderChildView( view );
  },

  _triggerShowChildren : function(){
    this.children.each(function(child){
      Marionette.triggerMethod.call(child, 'show');
    });
  },

  _renderChildren : function(){
    this.children.each(this._renderChildView, this);
  },

  _renderChildView : function(view){
    if( this.childViewContainer ){
      this.$( this.childViewContainer ).append( view.render().$el );
    } else {
      this.$el.append(view.render().$el);
    }
  }
});
