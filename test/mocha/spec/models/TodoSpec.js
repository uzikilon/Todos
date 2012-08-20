describe('Model :: Todo', function() {

  var todos, todo, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    require(['models/Todo'], function(Todo) {
      todos = new Todo.Collection();
      todo = new Todo.Model();
      done();
    });
  });

  afterEach(function(done){
    // clean mock data from storage
    todo.destroy();
    todos.fetch({
      success: function(c) {
        c.each(function(m){
          m.destroy();
        });
        todos = null;
        done();
      }
    });
  });

  describe('.Create()', function() {
    it('should create a todo', function(done) {
      var model = todos.create(mockData, {
        success: function(model) {
          expect(model).to.not.equal(null);
          expect(model.get('completed')).to.equal(false);
          expect(model.get('title')).to.equal('Foo Bar');
          expect(model.get('timestamp')).to.be.a('number');
          expect(model.get('id')).to.be.a('string');
          done();
        }
      });
    });
    it('should fail creating a title-less todo', function() {
      var spy = sinon.spy();
      todo.on('error', spy);
      todo.save({});
      assert.equal(spy.callCount, 1, 'error saving model');
      assert.isUndefined(todo.id, 'model id is undefined');
    });
  });

  describe('.Read()', function() {
    it('should read models from collection', function(done) {
      var spy = sinon.spy();

      todos.on('add', spy);
      todos.on('reset', spy);

      todos.create(mockData, {
        success: function(model) {

          assert.equal(spy.callCount, 1, "Temp spy calls");

          todos.reset();

          assert.equal(spy.callCount, 2, "Temp spy calls");
          assert.equal(todos.size(), 0, "Temp collection size");

          todos.fetch({
            success: function(){

              assert.equal(spy.callCount, 3, 'Total spy calls');
              assert.equal(todos.size(), 1, 'Total collection size');

              done();
            }
          });
        }
      });
    });

    it('should have proper remaining and completed methods', function() {

      var completedMock = _.extend({completed: true}, mockData);
      todos.add([mockData,mockData,mockData,completedMock]);

      expect(todos.remaining().length).to.equal(3);
      expect(todos.completed().length).to.equal(1);

      todos.remaining()[0].set({completed: true});
      
      expect(todos.remaining().length).to.equal(2);
      expect(todos.completed().length).to.equal(2);
      
    });
  });


});