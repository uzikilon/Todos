define(function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  module('View :: New Task', {
    setup: function() {
      var that = this;
      stop();
      require(['models/Todo', 'views/NewTask'], function(Todo, View) {
        that.todos = new Todo.Collection();
        that.view = new View({collection: that.todos});
        $('#sandbox').html(that.view.render().el);
        start();
      });
    },
    teardown: function() {
      this.view.remove();
      stop();
      this.todos.fetch({
        success: function(c) {
          c.each(function (m) { m.destroy(); });
          start();
        }
      });
    }
  });

  test('should create todo on submit', function() {
      this.view.$('input').val("Foo");
      this.view.$el.submit();
      equal(this.todos.size(), 1);
  });
  test('should should fail to create empty title', function() {
      this.view.$el.submit();
      equal(this.todos.size(), 0);
  });
  
});

