describe('View :: New Task', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    require(['models/Todo', 'views/NewTask'], function(Todo, View) {
      todos = new Todo.Collection();
      view = new View({collection: todos});
      $('#sandbox').html(view.render().el);
      done();
    });
  });

  afterEach(function(done) {
    view.$el.remove();
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

  describe('Events Handler', function() {
    it('should create todo on submit', function() {
        view.$('input').val("Foo");
        view.$el.submit();
        expect(todos.size()).to.equal(1);
    }); 
    it('should should fail to create empty title', function() {
        view.$el.submit();
        expect(todos.size()).to.equal(0);
    });
  });


  
});

