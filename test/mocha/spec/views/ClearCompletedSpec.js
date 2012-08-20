describe('View :: Clear Completed', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/ClearCompleted'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      $('#sandbox').html(that.view.render().el);
      done();
    });
  });

  afterEach(function() {
    this.view.remove();
  });

  describe('Shows And Hides', function() {
   
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
    
    it('should toggle on change', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).to.equal(true);

      this.todos.at(0).set('completed', false);
      expect(this.view.$el.is(':visible')).to.equal(false);

      this.todos.at(0).set('completed', true);
      expect(this.view.$el.is(':visible')).to.equal(true);

    });
    
  });

  describe('Renders', function() {
    it('should be empty', function() {
        expect(this.view.$el.text()).to.equal("");
    });

    it('should re-render on add', function() {
      this.todos.add(mockData);
      expect(this.view.$el.text()).to.equal("Clear 1 completed item");

      this.todos.add([mockData,mockData]);
      expect(this.view.$el.text()).to.equal("Clear 3 completed items");
    });

    it('should re-render on reset', function() {
      this.todos.reset([mockData,mockData]);
      expect(this.view.$el.text()).to.equal("Clear 2 completed items");

      this.todos.reset([]);
      expect(this.view.$el.text()).to.equal("");
    });

   it('should re-render on remove', function() {
      this.todos.reset([mockData,mockData]);
      expect(this.view.$el.text()).to.equal("Clear 2 completed items");

      this.todos.at(0).destroy();
      expect(this.view.$el.text()).to.equal("Clear 1 completed item");

      this.todos.at(0).destroy();
      expect(this.view.$el.text()).to.equal("");
    });

    it('should re-render on change', function() {
      this.todos.add(mockData);

      this.todos.at(0).set('completed', false);
      expect(this.view.$el.text()).to.equal("");

      this.todos.at(0).set('completed', true);
      expect(this.view.$el.text()).to.equal("Clear 1 completed item");
    });

  });

  describe('Events Handler', function() {
    it('should destroy all models on click', function() {
        this.todos.reset([mockData,mockData]);
        expect(this.todos.size()).to.equal(2);

        this.view.$el.click();
        expect(this.todos.size()).to.equal(0);
    });
  });

});