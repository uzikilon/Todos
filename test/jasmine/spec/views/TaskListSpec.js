describe('View :: Task List', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: false};

  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
      require(['models/Todo', 'views/TaskList'], function(Todo, View) {
        todos = new Todo.Collection();
        view = new View({collection: todos});
        $('#sandbox').html(view.render().el);
        flag = true;
      });
      return flag;
    }, "Create Models", ASYNC_TIMEOUT);
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
    
    it('should toggle on reset', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).toEqual(true);
      
      todos.reset([]);
      expect(view.$el.is(':visible')).toEqual(false);

      todos.reset([mockData]);
      expect(view.$el.is(':visible')).toEqual(true);

    });
    
  });

  describe('Renders', function() {
    it('should be empty', function() {
        expect(view.$el.text()).toEqual("");
    });

    it("should be able to add a child", function(){
      todos.add(mockData);
      waits(function(){
        expect(view.$('li').length).toEqual(1);
      }, 50);
    });

    it("should be able to add children", function(){
      todos.reset([mockData,mockData,mockData,mockData]);
       waits(function(){
        expect(view.$('li').length).toEqual(4);
      }, 50);
    });

  });

});