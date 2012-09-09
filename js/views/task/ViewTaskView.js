define(['jquery','underscore','backbone', 'helpers/ViewHelper'], function($, _, Backbone, ViewHelper) {
  
  var template = _.template('\
    <a href="#" class="icon-checkbox<%= completed ? " checked" : "" %>"></a>\
    <p><%= title %></p>\
    <a href="#" class="icon-delete"></a>\
  ');

  var View = Backbone.View.extend({
    className: 'viewTaskView',
    initialize: function(){
      this.model.on('change:completed', this.render, this);
    },
    render: function() {
      this.$el.html( template( this.model.toJSON() ) );
      this.$el.toggleClass('completed', this.model.get('completed'));
      return this;
    },
    events: {
      'dblclick p': function(){
        this.trigger('edit');
      },
      'click .icon-delete': function(e) {
        e.preventDefault();
        this.model.destroy();
      },
      'click .icon-checkbox': function(e) {
        e.preventDefault();
        this.model.save({'completed': !$(e.target).hasClass('checked')});
      },
      'mouseover': function(e){
        this.$el.addClass('over');
        var $target = $(e.target);
        if( $target.hasClass('icon-delete') ) {
          $target.addClass('active');
        }
      },
      'mouseout': function(e){
        this.$el.removeClass('over');
        var $target = $(e.target);
        if( $target.hasClass('icon-delete') ) {
          $target.removeClass('active');
        }
      }
    }
  });
  return View;
});