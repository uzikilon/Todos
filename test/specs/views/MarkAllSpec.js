describe('View :: Mark All As Completed', function() {

  var view, todos, $checkbox, mockData = { title: 'Foo Bar', timestamp: new Date().getTime() }, completedMock = _.extend({completed: true}, mockData);

  beforeEach(function(done) {
    require(['models/Todo', 'views/MarkAll'], function(Todo, View) {
      todos = new Todo.Collection();
      view = new View({collection: todos});
      $('#sandbox').append(view.render().el);
      $checkbox = view.$(".icon-checkbox");
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

  describe('Renders', function() {
    it('should be unchecked', function() {
      expect( $checkbox.hasClass('checked') ).to.equal(false);
      todos.add(mockData);
      expect( $checkbox.hasClass('checked') ).to.equal(false);
    });

    it('should toggle on change', function() {
      todos.add(mockData);
      todos.at(0).set('completed', true);
      expect( $checkbox.hasClass('checked') ).to.equal(true);
      
      todos.add(mockData);
      expect( $checkbox.hasClass('checked') ).to.equal(false);

      todos.at(1).set('completed', true);
      expect( $checkbox.hasClass('checked') ).to.equal(true);
    });

    it('should toggle on remove', function() {
      todos.add([mockData, completedMock]);
      expect( $checkbox.hasClass('checked') ).to.equal(false);

      todos.at(0).destroy();
      expect( $checkbox.hasClass('checked') ).to.equal(true);

      todos.reset([mockData, completedMock]);
      expect( $checkbox.hasClass('checked') ).to.equal(false);

      todos.at(1).destroy();
      expect( $checkbox.hasClass('checked') ).to.equal(false);
    });

    it('should toggle on reset', function() {
      todos.add([completedMock, completedMock]);
      expect( $checkbox.hasClass('checked') ).to.equal(true);

      todos.reset([mockData]);
      expect( $checkbox.hasClass('checked') ).to.equal(false);

      todos.reset([completedMock]);
      expect( $checkbox.hasClass('checked') ).to.equal(true);
    });

  });
});