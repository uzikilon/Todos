define(function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

   module('View :: Footer', {
    setup: function() {
      var that = this;
      stop();
      require(['models/Todo', 'views/FooterView'], function(Todo, View) {
        that.todos = new Todo.Collection();
        that.view = new View({collection: that.todos});
        $('#sandbox').html(that.view.render().el);
        start();
      });
    },
    teardown: function() {
      this.view.remove();
    }
  });

  test('should be hidden', function() {
    equal(this.view.$el.is(':visible'), false);
  });

  test('should toggle on add', function() {
    this.todos.add(mockData);
    equal(this.view.$el.is(':visible'), true);
  });

  test('should toggle on remove', function() {
    this.todos.add([mockData, mockData]);
    equal(this.view.$el.is(':visible'), true);

    this.todos.at(0).destroy();
    equal(this.view.$el.is(':visible'), true);

    this.todos.at(0).destroy();
    equal(this.view.$el.is(':visible'), false);
  });

  test('should toggle on reset', function() {
    this.todos.add(mockData);
    equal(this.view.$el.is(':visible'), true);
    
    this.todos.reset([]);
    equal(this.view.$el.is(':visible'), false);

    this.todos.reset([mockData]);
    equal(this.view.$el.is(':visible'), true);
  });

});