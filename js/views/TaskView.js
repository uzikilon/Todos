define(['jquery','underscore','backbone', 'helpers/ViewHelper'], function($, _, Backbone, ViewHelper) {
  
  var KEYCODE_ENTER = 13,
      KEYCODE_ESC = 27;

  var template = _.template('\
    <div>\
      <a href="#" class="icon-checkbox<%= completed ? " checked" : "" %>"></a>\
      <p><%= title %></p>\
      <a href="#" class="icon-delete"></a>\
    </div>\
    <input type="text" class="editbox" value="<%= title %>">\
  ');

  var View = Backbone.View.extend({
    tagName: 'li',
    className: 'task',
    initialize: function(){
      this.model.on('change:completed', this.render, this);
      this.model.on('destroy', this.remove, this);
      this.$el.hide();
    },
    render: function(){
      this.$el.html( template( this.model.toJSON() ) );
      this.$el.toggleClass('completed', this.model.get('completed'));
      this.$el.fadeIn();
      return this;
    },
    remove: function(){
      this.$el.slideUp(ViewHelper.delay, function(){
        $(this).remove();
      });
    },
    events: {
      'dblclick p': 'edit',
      'blur .editbox': 'update',
      'keyup .editbox': function(e){
        if (e.keyCode === KEYCODE_ENTER) this.update();
        if (e.keyCode === KEYCODE_ESC) this.reset();
      },
      'click a.icon-checkbox': function(e) {
        e.preventDefault();
        this.model.save({'completed': !$(e.target).hasClass('checked')});
      },
      'mouseover': function(e){
        this.$el.addClass('over');
      },
      'mouseout': function(e){
        this.$el.removeClass('over');
      },
      'mouseover a.icon-delete': function(e){
        $(e.target).addClass('active');
      },
      'mouseout a.icon-delete': function(e){
        $(e.target).removeClass('active');
      },
      'click a.icon-delete': function(e) {
        e.preventDefault();
        this.model.destroy();
      }
    },
    reset: function(){
      this.$el.removeClass('editing');
      this.render();
    },
    edit: function(){
      this.$el.addClass('editing');
      this.$(".editbox").focus().select();
    },
    update: function(){
      this.model.save({title: this.$('.editbox').val().trim()});
      this.reset();
    }
  });
  return View;
});