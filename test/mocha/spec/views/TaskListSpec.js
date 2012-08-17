describe('View :: Task List', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: false};

  beforeEach(function(done) {
    require(['models/Todo', 'views/TaskList'], function(Todo, View) {
      todos = new Todo.Collection();
      view = new View({collection: todos});
      $('#sandbox').html(view.render().el);
      done();
    });
  });

  afterEach(function(done) {
    view.$el.remove();
    todos = null;
    done();
  });

  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
      expect(view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on add', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).to.equal(true);
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
    it('should be empty', function() {
        expect(view.$el.text()).to.equal("");
    });

    it("should be able to add a child", function(done){

      view.on('add', function(){
        expect(view.$('li').length).to.equal(1);
         done();
      });
      todos.add(mockData);
    });

    it("should be able to add children", function(done){
      view.on('add', function(){
        expect(view.$('li').length).to.equal(4);
        done();
      });
      todos.reset([mockData,mockData,mockData,mockData]);
    });

  });

});