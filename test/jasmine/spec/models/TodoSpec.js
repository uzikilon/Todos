describe('Model :: Todo', function() {

  var todos, todo, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
      require(['models/Todo'], function(Todo) {
        todos = new Todo.Collection();
        todo = new Todo.Model();
        flag = true;
      });
      return flag;
    }, "Create Models", ASYNC_TIMEOUT);
  });

  afterEach(function(){
    var flag = false;
    todo.destroy();
    waitsFor(function() {
      todos.fetch({
        success: function(c) {
          c.each(function(m){
            m.destroy();
          });
          todos = null;
          flag = true;
        }
      });
      return flag;
    }, "Cleanup Models", ASYNC_TIMEOUT);
  });

  describe('.Create()', function() {
    it('should create a todo', function() {
      var todo, flag = false;
      waitsFor(function() {
        todo = todos.create(mockData, {
          success: function() {
            flag = true;
          }
        });
        return flag;
      }, "Create Todo", ASYNC_TIMEOUT);

      runs(function(){
        expect(todo).not.toBe(null);
        expect(todo.get('completed')).toEqual(false);
        expect(todo.get('title')).toEqual('Foo Bar');
        expect(todo.get('timestamp')).toEqual(jasmine.any(Number));
        expect(todo.id).toEqual(jasmine.any(String));
      });

    });

    it('should fail creating a title-less todo', function() {
      var spy = sinon.spy();
      todo.on('error', spy);
      todo.save({});
      expect(spy.callCount).toEqual(1);
      expect(todo.id).toBeUndefined();
    });

  });

  describe('.Read()', function() {
    it('should read models from collection', function(done) {
      var spy = sinon.spy();

      todos.on('add', spy);
      todos.on('reset', spy);

      waitsFor(function() {

        todos.create(mockData, {
          success: function() {

            expect(todos.size()).toEqual(1);
            expect(spy.callCount).toEqual(1);

            todos.reset();

            expect(todos.size()).toEqual(0);
            expect(spy.callCount).toEqual(2);

            todos.fetch({
              success: function(){
                expect(todos.size()).toEqual(1);
                expect(spy.callCount).toEqual(3);
                flag = true;
              }
            });
          }
        });
        return flag;
      }, "create, reset, read collection", ASYNC_TIMEOUT);

    });

    it('should have proper remaining and completed methods', function() {

      var completedMock = _.extend({completed: true}, mockData);

      todos.on('add', function(){
        expect(spy.callCount).toEqual(1);

        expect(todos.remaining().length).toEqual(3);
        expect(todos.completed().length).toEqual(1);

        todos.remaining()[0].set({completed: true});
        
        expect(todos.remaining().length).toEqual(2);
        expect(todos.completed().length).toEqual(2);
      });

    });
  });


});