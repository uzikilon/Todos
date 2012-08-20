define(function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime() }, completedMock = _.extend({completed: true}, mockData);

  module('View :: Mark All As Completed', {
    setup: function() {
      var that = this;
      stop();
      require(['models/Todo', 'views/MarkAll'], function(Todo, View) {
        that.todos = new Todo.Collection();
        that.view = new View({collection: that.todos});
        $('#sandbox').html(that.view.render().el);
        that.$checkbox = that.view.$(".icon-checkbox");
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

  test('should be unchecked', function() {
    equal( this.$checkbox.hasClass('checked'), false);
    this.todos.add(mockData);
    equal( this.$checkbox.hasClass('checked'), false);
  });

  test('should toggle on change', function() {
    this.todos.add(mockData);
    this.todos.at(0).set('completed', true);
    equal( this.$checkbox.hasClass('checked'), true);
    
    this.todos.add(mockData);
    equal( this.$checkbox.hasClass('checked'), false);

    this.todos.at(1).set('completed', true);
    equal( this.$checkbox.hasClass('checked'), true);
  });

  test('should toggle on remove', function() {
    this.todos.add([mockData, completedMock]);
    equal( this.$checkbox.hasClass('checked'), false);

    this.todos.at(0).destroy();
    equal( this.$checkbox.hasClass('checked'), true);

    this.todos.reset([mockData, completedMock]);
    equal( this.$checkbox.hasClass('checked'), false);

    this.todos.at(1).destroy();
    equal( this.$checkbox.hasClass('checked'), false);
  });

  test('should toggle on reset', function() {
    this.todos.add([completedMock, completedMock]);
    equal( this.$checkbox.hasClass('checked'), true);

    this.todos.reset([mockData]);
    equal( this.$checkbox.hasClass('checked'), false);

    this.todos.reset([completedMock]);
    equal( this.$checkbox.hasClass('checked'), true);
  });

});