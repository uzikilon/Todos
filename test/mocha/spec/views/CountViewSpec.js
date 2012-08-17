describe('View :: Count Remaining Items', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    require(['models/Todo', 'views/CountView'], function(Todo, View) {
      todos = new Todo.Collection();
      view = new View({collection: todos});
      $('#sandbox').html(view.render().el);
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

  describe('Renders Text', function() {
    it('should be empty', function() {
        expect(view.$el.text()).to.equal("");
    });

    it('should re-render on add', function() {
      todos.add(mockData);
      expect(view.$el.text()).to.equal("1 item left");

      todos.add([mockData,mockData]);
      expect(view.$el.text()).to.equal("3 items left");
    });

    it('should re-render on reset', function() {
      todos.reset([mockData,mockData]);
      expect(view.$el.text()).to.equal("2 items left");

      todos.reset([]);
      expect(view.$el.text()).to.equal("");
    });

    it('should re-render on remove', function() {
      todos.reset([mockData,mockData]);
      expect(view.$el.text()).to.equal("2 items left");

      todos.at(0).destroy();
      expect(view.$el.text()).to.equal("1 item left");

      todos.at(0).destroy();
      expect(view.$el.text()).to.equal("");
    });

    it('should re-render on change', function() {
      todos.add(mockData);

      todos.at(0).set('completed', true);
      expect(view.$el.text()).to.equal("0 items left");

      todos.at(0).set('completed', false);
      expect(view.$el.text()).to.equal("1 item left");
    });

  });

});