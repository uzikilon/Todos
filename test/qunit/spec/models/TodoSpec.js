define(function(){

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  module( "Model :: Todo", {
    setup: function() {
      stop();
      var that = this;
      require(['models/Todo'], function(Todo) {
        that.todos = new Todo.Collection();
        that.todo = new Todo.Model();
        start();
      });
    },
    teardown: function() {
      stop();
      var that = this;
      that.todo.destroy();
      that.todos.fetch({
        success: function(c) {
          c.each(function(m){
            m.destroy();
          });
          that.todos = null;
          that.todo = null;
          start();
        }
      });
    }
  });

  asyncTest('should create a todo', function() {
    expect( 5 );
    this.todos.create(mockData, {
      success: function(model){
        ok(model !== null);
        equal(model.get('completed'), false);
        equal(model.get('title'), 'Foo Bar');
        ok(typeof model.get('timestamp') === 'number');
        ok(typeof model.id === 'string');
        start();
      }
    });
  });

  test('should fail creating a title-less todo', function() {
    expect( 2 );
    var spy = sinon.spy();
    this.todo.on('error', spy);
    this.todo.save({});
    equal(spy.callCount, 1);
    ok(this.todo.id === undefined);
  });

  asyncTest('should read models from collection', function() {
    expect( 6 );
    var spy = sinon.spy();
    
    this.todos.on('add', spy);
    this.todos.on('reset', spy);

    var that = this;

    this.todos.create(mockData, {
      success: function() {
        
        equal(that.todos.size(), 1);
        equal(spy.callCount, 1);

        that.todos.reset();

        equal(that.todos.size(), 0);
        equal(spy.callCount, 2);

        that.todos.fetch({
          success: function(){
            equal(that.todos.size(), 1);
            equal(spy.callCount, 3);
            start();
          }
        });
      }
    });
  });

  test('should have proper remaining and completed methods', function() {

      var completedMock = _.extend({completed: true}, mockData);
      this.todos.add([mockData,mockData,mockData,completedMock]);

      equal(this.todos.remaining().length, 3);
      equal(this.todos.completed().length, 1);

      this.todos.remaining()[0].set({completed: true});

      equal(this.todos.remaining().length, 2);
      equal(this.todos.completed().length, 2);
    });

});