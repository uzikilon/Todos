describe('View :: Footer', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function(done) {
    require(['models/Todo', 'views/FooterView'], function(Todo, View) {
      todos = new Todo.Collection();
      view = new View({collection: todos});
      $('#sandbox').append(view.render().el);
      done();
    });
  });

  afterEach(function() {
    view.$el.remove();
    todos = null;
  });

  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
     expect(view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on add', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).to.equal(true);
    });

    it('should toggle on remove', function() {
      todos.add([mockData, mockData]);
      expect(view.$el.is(':visible')).to.equal(true);

      todos.at(0).destroy();
      expect(view.$el.is(':visible')).to.equal(true);

      todos.at(0).destroy();
      expect(view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on reset', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).to.equal(true);
      
      todos.reset([]);
      expect(view.$el.is(':visible')).to.equal(false);

      todos.reset([mockData]);
      expect(view.$el.is(':visible')).to.equal(true);
    });
    

  });
});