describe('View :: Task List', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: false};

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/Todo', 'views/TaskList'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      $('#sandbox').html(that.view.render().el);
      flag = true;
    });

    waitsFor(function() {
      return flag;
    });

  });

  afterEach(function() {
    this.view.remove();
  });


  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
      expect(this.view.$el.is(':visible')).toEqual(false);
    });

    it('should toggle on add', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).toEqual(true);
    });
    
    it('should toggle on reset', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).toEqual(true);
      
      this.todos.reset([]);
      expect(this.view.$el.is(':visible')).toEqual(false);

      this.todos.reset([mockData]);
      expect(this.view.$el.is(':visible')).toEqual(true);

    });
    
  });

  describe('Renders', function() {
    it('should be empty', function() {
        expect(this.view.$el.text()).toEqual("");
    });

    it("should be able to add a child", function(){
      this.todos.add(mockData);
      waits(function(){
        expect(this.view.$('li').length).toEqual(1);
      }, 50);
    });

    it("should be able to add children", function(){
      this.todos.reset([mockData,mockData,mockData,mockData]);
       waits(function(){
        expect(this.view.$('li').length).toEqual(4);
      }, 50);
    });

  });

});