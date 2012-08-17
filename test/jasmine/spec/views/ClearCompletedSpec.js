describe('View :: Clear Completed', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };


  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
        require(['models/Todo', 'views/ClearCompleted'], function(Todo, View) {
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
    $('#sandbox').empty();
  });

  describe('Shows And Hides', function() {
   
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
    
    it('should toggle on change', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).toEqual(true);

      todos.at(0).set('completed', false);
      expect(view.$el.is(':visible')).toEqual(false);

      todos.at(0).set('completed', true);
      expect(view.$el.is(':visible')).toEqual(true);

    });
    
  });

  describe('Renders', function() {
    it('should be empty', function() {
        expect(view.$el.text()).toEqual("");
    });

    it('should re-render on add', function() {
      todos.add(mockData);
      expect(view.$el.text()).toEqual("Clear 1 completed item");

      todos.add([mockData,mockData]);
      expect(view.$el.text()).toEqual("Clear 3 completed items");
    });

    it('should re-render on reset', function() {
      todos.reset([mockData,mockData]);
      expect(view.$el.text()).toEqual("Clear 2 completed items");

      todos.reset([]);
      expect(view.$el.text()).toEqual("");
    });

   it('should re-render on remove', function() {
      todos.reset([mockData,mockData]);
      expect(view.$el.text()).toEqual("Clear 2 completed items");

      todos.at(0).destroy();
      expect(view.$el.text()).toEqual("Clear 1 completed item");

      todos.at(0).destroy();
      expect(view.$el.text()).toEqual("");
    });

    it('should re-render on change', function() {
      todos.add(mockData);

      todos.at(0).set('completed', false);
      expect(view.$el.text()).toEqual("");

      todos.at(0).set('completed', true);
      expect(view.$el.text()).toEqual("Clear 1 completed item");
    });

  });

  describe('Events Handler', function() {
    it('should destroy all models on click', function() {
        todos.reset([mockData,mockData]);
        expect(todos.size()).toEqual(2);

        view.$el.click();
        expect(todos.size()).toEqual(0);
    });
  });

});