define(function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  module('View :: Clear Completed', {
    setup: function() {
      var that = this;
      stop();
      require(['models/Todo', 'views/ClearCompleted'], function(Todo, View) {
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

  test('should toggle on change', function() {
    this.todos.add(mockData);
    equal(this.view.$el.is(':visible'), true);

    this.todos.at(0).set('completed', false);
    equal(this.view.$el.is(':visible'), false);

    this.todos.at(0).set('completed', true);
    equal(this.view.$el.is(':visible'), true);

  });

  test('should be empty', function() {
    equal(this.view.$el.text(), "");
  });

  test('should re-render on add', function() {
    this.todos.add(mockData);
    equal(this.view.$el.text(), "Clear 1 completed item");

    this.todos.add([mockData,mockData]);
    equal(this.view.$el.text(), "Clear 3 completed items");
  });

  test('should re-render on reset', function() {
    this.todos.reset([mockData,mockData]);
    equal(this.view.$el.text(), "Clear 2 completed items");

    this.todos.reset([]);
    equal(this.view.$el.text(), "");
  });
 
  test('should re-render on remove', function() {
    this.todos.reset([mockData,mockData]);
    equal(this.view.$el.text(), "Clear 2 completed items");

    this.todos.at(0).destroy();
    equal(this.view.$el.text(), "Clear 1 completed item");

    this.todos.at(0).destroy();
    equal(this.view.$el.text(), "");
  });

  test('should re-render on change', function() {
    this.todos.add(mockData);

    this.todos.at(0).set('completed', false);
    equal(this.view.$el.text(), "");

    this.todos.at(0).set('completed', true);
    equal(this.view.$el.text(), "Clear 1 completed item");
  });

  test('should destroy all models on click', function() {
    this.todos.reset([mockData,mockData]);
    equal(this.todos.size(), 2);

    this.view.$el.click();
    equal(this.todos.size(), 0);
  });

});