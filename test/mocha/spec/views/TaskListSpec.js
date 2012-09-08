describe('View :: Task List', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: false};

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/TaskList'], function(Todo, View) {
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
    
    it('should toggle on reset', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).to.equal(true);
      
      this.todos.reset([]);
      expect(this.view.$el.is(':visible')).to.equal(false);

      this.todos.reset([mockData]);
      expect(this.view.$el.is(':visible')).to.equal(true);

    });
    
  });

  describe('Renders', function() {
    it('should be empty', function() {
        expect(this.view.$el.text()).to.equal("");
    });

    it("should be able to add a child", function(){
      this.todos.add(mockData);
      expect(this.view.$('li').length).to.equal(1);
    });

    it("should be able to add children", function(){
      this.todos.reset([mockData,mockData,mockData,mockData]);
      expect(this.view.$('li').length).to.equal(4);
    });

  });

});