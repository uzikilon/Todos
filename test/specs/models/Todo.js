describe('Model :: Todo', function() {

  var todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    require(['models/Todo'], function(Todo) {
      todos = new Todo.Collection();
      done();
    });
  });

  afterEach(function(done){
    // clean mock data from storage
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
    it('should create a model', function(done) {
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
    it('should fail', function(done) {
      var model = todos.create({}, {
        error: function(model, error) {
          expect(error).to.equal("Missing Title");
          expect(model.id).to.be.a('undefined');
          done();
        }
      });
    });
  });

  describe('.Read()', function() {


    it('should read a models from collection', function(done) {
      todos.create(mockData, {
        success: function(model) {
          expect(todos).to.be.a('object');
          expect(todos.size()).to.equal(1);
          done();
        }
      });
      todos.fetch();
    });

    it('should have proper remaining and completed methods', function(done) {

      var completedMock = _.extend({}, mockData, {completed: true});

      todos.on('add', function(){

        expect(todos).to.not.equal(null);

        expect(todos).to.be.a('object').with.length(4);

        expect(todos.remaining().length).to.equal(3);
        expect(todos.completed().length).to.equal(1);

        todos.remaining()[0].set({completed: true});
        expect(todos.remaining().length).to.equal(2);
        expect(todos.completed().length).to.equal(2);

        done();
      });

      todos.add([mockData,mockData,mockData,completedMock]);
    });
  });


});