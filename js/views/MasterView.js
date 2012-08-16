define([
    'backbone',
    'views/TaskList',
    'views/NewTask',
    'views/MarkAll',
    'views/FooterView'
  ], function(Backbone, TaskList, NewTask, MarkAll, FooterView) {
  var View = Backbone.View.extend({
    className: 'masterView',
    initialize: function(){
      this.children = {
        taskList: new TaskList({collection: this.collection}),
        newTask: new NewTask({collection: this.collection}),
        markAll: new MarkAll({collection: this.collection}),
        footerView: new FooterView({collection: this.collection})
      };
      this.$el.hide();
      this.$el.append(this.children.newTask.render().el);
      this.$el.append(this.children.markAll.render().el);
      this.$el.append(this.children.taskList.render().el);
      this.$el.append(this.children.footerView.render().el);
    },
    render: function(){
      this.$el.show();
      return this;
    }
  });
  return View;
});