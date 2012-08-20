describe('Model :: Todo', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function() {
    var that = this,
        done = false;

    require(['models/Todo'], function(Todo) {
      that.todos = new Todo.Collection();
      that.todo = new Todo.Model();
      done = true;
    });

    waitsFor(function() {
      return done;
    }, "Create Models");

  });

  afterEach(function(){
    var done = false,
        isDone = function(){ return done; };

    this.todos.fetch({
      success: function(c) {
        c.each(function(m){
          m.destroy();
        });
        done = true;
      }
    });

    waitsFor(isDone);

    done = false;
    this.todo.destroy({
      success: function(){
        done = true;
      }
    });
    
    waitsFor(isDone);

  });

  describe('.Create()', function() {

    it('should create a todo', function() {
      var done = false;
      var todo = this.todos.create(mockData, {
        success: function() {
          done = true;
        }
      });

      waitsFor(function() { return done; });

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
      this.todo.on('error', spy);
      this.todo.save({});
      expect(spy.callCount).toEqual(1);
      expect(this.todo.id).toBeUndefined();
    });

  });

  describe('.Read()', function() {
    it('should read models from collection', function() {
      var done = false,
          spy = sinon.spy(),
          todos = this.todos;

      todos.on('reset', spy);
      this.todo.on('sync', spy);


      this.todo.on('sync', function(){
        expect(todos.size()).toEqual(0);
        expect(spy.callCount).toEqual(1);

        todos.reset();

        expect(todos.size()).toEqual(0);
        expect(spy.callCount).toEqual(2);

        todos.fetch({
          success: function(){
            expect(todos.size()).toEqual(1);
            expect(spy.callCount).toEqual(3);
            done = true;
          }
        });

      }, this);

      this.todo.save(mockData);


      waitsFor(function() { return done; });

    });

    it('should have proper remaining and completed methods', function() {

      var completedMock = _.extend({completed: true}, mockData);
      this.todos.add([mockData,mockData,mockData,completedMock]);

      expect(this.todos.remaining().length).toEqual(3);
      expect(this.todos.completed().length).toEqual(1);

      this.todos.remaining()[0].set({completed: true});
        
      expect(this.todos.remaining().length).toEqual(2);
      expect(this.todos.completed().length).toEqual(2);

    });
  });


});