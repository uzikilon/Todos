describe('View :: Count Remaining Items', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
        require(['models/Todo', 'views/CountView'], function(Todo, View) {
        todos = new Todo.Collection();
        view = new View({collection: todos});
        $('#sandbox').html(view.render().el);
        flag = true;
      });
      return flag;
    }, "Create Models");
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

  describe('Renders Text', function() {
    it('should be empty', function() {
        expect(view.$el.text()).toEqual("");
    });

    it('should re-render on add', function() {
      todos.add(mockData);
      expect(view.$el.text()).toEqual("1 item left");

      todos.add([mockData,mockData]);
      expect(view.$el.text()).toEqual("3 items left");
    });

    it('should re-render on reset', function() {
      todos.reset([mockData,mockData]);
      expect(view.$el.text()).toEqual("2 items left");

      todos.reset([]);
      expect(view.$el.text()).toEqual("");
    });

    it('should re-render on remove', function() {
      todos.reset([mockData,mockData]);
      expect(view.$el.text()).toEqual("2 items left");

      todos.at(0).destroy();
      expect(view.$el.text()).toEqual("1 item left");

      todos.at(0).destroy();
      expect(view.$el.text()).toEqual("");
    });

    it('should re-render on change', function() {
      todos.add(mockData);

      todos.at(0).set('completed', true);
      expect(view.$el.text()).toEqual("0 items left");

      todos.at(0).set('completed', false);
      expect(view.$el.text()).toEqual("1 item left");
    });

  });

});