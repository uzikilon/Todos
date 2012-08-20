describe('View :: Footer', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/Todo', 'views/FooterView'], function(Todo, View) {
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

    it('should toggle on remove', function() {
      this.todos.add([mockData, mockData]);
      expect(this.view.$el.is(':visible')).toEqual(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).toEqual(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).toEqual(false);
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
});