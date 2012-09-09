define(['jquery','underscore','backbone', 'helpers/ViewHelper'], function($, _, Backbone, ViewHelper) {
  
  var KEYCODE_ENTER = 13,
      KEYCODE_ESC = 27;

  var View = Backbone.View.extend({
    tagName: 'input',
    className: 'editTaskView',
    initialize: function(){
      this.$el.attr('type', 'text');
    },
    render: function(){
      this.$el.val( this.model.get('title') );
      return this;
    },
    events: {
      'blur': 'reset',
      'keyup': function(e){
        if (e.keyCode === KEYCODE_ENTER) this.update();
        if (e.keyCode === KEYCODE_ESC) this.reset();
      }
    },
    reset: function(){
      this.trigger('done');
    },
    update: function(){
      this.model.save({title: this.$el.val().trim()});
      this.reset();
    }
  });
  return View;
});