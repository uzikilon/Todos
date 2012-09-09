define(['backbone', 'helpers/ViewHelper', 'views/task/EditTaskView', 'views/task/ViewTaskView'], function(Backbone, ViewHelper, EditTaskView, ViewTaskView) {

  var View = Backbone.View.extend({
    tagName: 'li',
    className: 'task',
    initialize: function(){
      this.model.on('change:completed', this.render, this);
      this.model.on('destroy', this.remove, this);
      this.$el.hide();
    },
    render: function(){
      this.view();
      this.$el.fadeIn();
      return this;
    },
    remove: function() {
      this.$el.slideUp(ViewHelper.delay, function(){
        $(this).remove();
      });
    },
    view: function() {
      this.child = new ViewTaskView({model: this.model});
      this.$el.html( this.child.render().el );
      this.child.on('edit', this.edit, this);
    },
    edit: function(){
      this.child = new EditTaskView({model: this.model});
      this.child.on('done', this.view, this);
      this.$el.html( this.child.render().el );
      this.child.focus();
    }
  });
  return View;
});