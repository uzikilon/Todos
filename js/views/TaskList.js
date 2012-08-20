define(['backbone', 'views/TaskView', 'helpers/ViewHelper'], function(Backbone, TaskView, ViewHelper) {

  var delay = 100;

  var View = Backbone.View.extend({
    tagName: 'ul',
    className: 'taskList',
    initialize: function(){
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.add, this);
    },
    add: function( model ){
      var self = this;
      model._view = new TaskView({model: model});
      var $el = model._view.render().$el;
      this.$el.append($el.hide(function(){
        $el.fadeIn(ViewHelper.delay, function(){
          self.trigger('add');
        });
      }));
      this.$el.show();
    },
    render: function(){
      this.$el.empty();
      this.$el.hide();
      this.collection.each(this.add, this);
      return this;
    }
  });
  return View;
});