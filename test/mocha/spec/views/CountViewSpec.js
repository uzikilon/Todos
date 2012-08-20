describe('View :: Count Remaining Items', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/CountView'], function(Todo, View) {
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

  describe('Renders Text', function() {
    it('should be empty', function() {
        expect(this.view.$el.text()).to.equal("");
    });

    it('should re-render on add', function() {
      this.todos.add(mockData);
      expect(this.view.$el.text()).to.equal("1 item left");

      this.todos.add([mockData,mockData]);
      expect(this.view.$el.text()).to.equal("3 items left");
    });

    it('should re-render on reset', function() {
      this.todos.reset([mockData,mockData]);
      expect(this.view.$el.text()).to.equal("2 items left");

      this.todos.reset([]);
      expect(this.view.$el.text()).to.equal("");
    });

    it('should re-render on remove', function() {
      this.todos.reset([mockData,mockData]);
      expect(this.view.$el.text()).to.equal("2 items left");

      this.todos.at(0).destroy();
      expect(this.view.$el.text()).to.equal("1 item left");

      this.todos.at(0).destroy();
      expect(this.view.$el.text()).to.equal("");
    });

    it('should re-render on change', function() {
      this.todos.add(mockData);

      this.todos.at(0).set('completed', true);
      expect(this.view.$el.text()).to.equal("0 items left");

      this.todos.at(0).set('completed', false);
      expect(this.view.$el.text()).to.equal("1 item left");
    });

  });

});