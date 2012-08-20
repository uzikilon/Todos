describe('View :: Footer', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/FooterView'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      $('#sandbox').html(that.view.render().el);
      done();
    });
  });

  afterEach(function() {
    this.view.remove();
  });

  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
     expect(this.view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on add', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).to.equal(true);
    });

    it('should toggle on remove', function() {
      this.todos.add([mockData, mockData]);
      expect(this.view.$el.is(':visible')).to.equal(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).to.equal(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on reset', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).to.equal(true);
      
      this.todos.reset([]);
      expect(this.view.$el.is(':visible')).to.equal(false);

      this.todos.reset([mockData]);
      expect(this.view.$el.is(':visible')).to.equal(true);
    });
    

  });
});