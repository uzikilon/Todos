describe('View :: New Task', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
      require(['models/Todo', 'views/NewTask'], function(Todo, View) {
        flag = true;
        todos = new Todo.Collection();
        view = new View({collection: todos});
        $('#sandbox').html(view.render().el);
      });
      return flag;
    }, "Create Models");
  });

  afterEach(function() {
    var flag = false;
    view.$el.remove();
    waitsFor(function() {
      todos.fetch({
        success: function(c) {
          flag = true;
          function d(m) { m.destroy(); }
          c.each(d);
          todos = null;
        }
      });
      return flag;
    }, "Cleanup Models");
  });

  describe('Events Handler', function() {
    
    it('should create todo on submit', function() {
        view.$('input').val("Foo");
        view.$el.submit();
        expect(todos.size()).toEqual(1);
    });
    it('should should fail to create empty title', function() {
        view.$el.submit();
        expect(todos.size()).toEqual(0);
    });
  });


  
});

