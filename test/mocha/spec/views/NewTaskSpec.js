describe('View :: New Task', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/NewTask'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      $('#sandbox').html(that.view.render().el);
      done();
    });
  });

  afterEach(function(done) {
    this.view.remove();
    this.todos.fetch({
      success: function(c) {
        c.each(function(m){ m.destroy(); });
        done();
      }
    });
  });


  describe('Events Handler', function() {
    it('should create todo on submit', function() {
        this.view.$('input').val("Foo");
        this.view.$el.submit();
        expect(this.todos.size()).to.equal(1);
    });
    it('should should fail to create empty title', function() {
        this.view.$el.submit();
        expect(this.todos.size()).to.equal(0);
    });
  });


  
});

