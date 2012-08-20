describe('Model :: Todo', function() {

  var todos, todo, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo'], function(Todo) {
      that.todos = new Todo.Collection();
      that.todo = new Todo.Model();
      done();
    });
  });

  afterEach(function(done){
    var that = this;
    this.todos.fetch({
      success: function(c) {
        c.each(function(m){
          m.destroy();
        });
        that.todo.destroy();
        done();
      }
    });
  });

  describe('.Create()', function() {

    it('should create a todo', function(done) {
      this.todos.create(mockData, {
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
      this.todo.on('error', spy);
      this.todo.save({});
      assert.equal(spy.callCount, 1, 'error saving model');
      assert.isUndefined(this.todo.id, 'model id is undefined');
    });
  });

  describe('.Read()', function() {
    it('should read models from collection', function(done) {
      var spy = sinon.spy();

      this.todos.on('add', spy);
      this.todos.on('reset', spy);

      var that = this;
      this.todos.create(mockData, {
        success: function(model) {

          assert.equal(spy.callCount, 1, "Temp spy calls");

          that.todos.reset();

          assert.equal(spy.callCount, 2, "Temp spy calls");
          assert.equal(that.todos.size(), 0, "Temp collection size");

          that.todos.fetch({
            success: function(){

              assert.equal(spy.callCount, 3, 'Total spy calls');
              assert.equal(that.todos.size(), 1, 'Total collection size');

              done();
            }
          });
        }
      });
    });

    it('should have proper remaining and completed methods', function() {

      var completedMock = _.extend({completed: true}, mockData);
      this.todos.add([mockData,mockData,mockData,completedMock]);

      expect(this.todos.remaining().length).to.equal(3);
      expect(this.todos.completed().length).to.equal(1);

      this.todos.remaining()[0].set({completed: true});
      
      expect(this.todos.remaining().length).to.equal(2);
      expect(this.todos.completed().length).to.equal(2);
      
    });
  });


});