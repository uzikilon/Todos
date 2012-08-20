define(function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: false};

  module('View :: Task List', {
    setup: function() {
      var that = this;
      stop();
      require(['models/Todo', 'views/TaskList'], function(Todo, View) {
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

  test('should be empty', function() {
    equal(this.view.$el.text(), "");
  });

  test("should be able to add a child", function(){
    expect(1);
    this.todos.add(mockData);
    stop();
    var fn = function(){
      equal(this.view.$('li').length, 1);
      start();
    };
    _.defer(_.bind(fn, this), 50);
  });

  test("should be able to add children", function(){
    expect(1);
    this.todos.reset([mockData,mockData,mockData,mockData]);
    stop();
    var fn = function(){
      equal(this.view.$('li').length, 4);
      start();
    };
    _.defer(_.bind(fn, this), 50);
  });

});