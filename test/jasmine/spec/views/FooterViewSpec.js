describe('View :: Footer', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
        require(['models/Todo', 'views/FooterView'], function(Todo, View) {
        todos = new Todo.Collection();
        view = new View({collection: todos});
        $('#sandbox').html(view.render().el);
        flag = true;
      });
      return flag;
    }, "Create Models", ASYNC_TIMEOUT);
  });

  afterEach(function() {
    view.$el.remove();
    todos = null;
  });

  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
     expect(view.$el.is(':visible')).toEqual(false);
    });

    it('should toggle on add', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).toEqual(true);
    });

    it('should toggle on remove', function() {
      todos.add([mockData, mockData]);
      expect(view.$el.is(':visible')).toEqual(true);

      todos.at(0).destroy();
      expect(view.$el.is(':visible')).toEqual(true);

      todos.at(0).destroy();
      expect(view.$el.is(':visible')).toEqual(false);
    });

    it('should toggle on reset', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).toEqual(true);
      
      todos.reset([]);
      expect(view.$el.is(':visible')).toEqual(false);

      todos.reset([mockData]);
      expect(view.$el.is(':visible')).toEqual(true);
    });
    

  });
});