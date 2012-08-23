describe('View :: Count Remaining Items', function() {

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/Todo', 'views/CountView'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      that.mockData = { title: 'Foo Bar', timestamp: new Date().getTime() };
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

  describe('Shows And Hides', function() {
    it('should be hidden', function() {
     expect(this.view.$el.is(':visible')).toEqual(false);
    });
    it('should toggle on add', function() {
      this.todos.add(this.mockData);
      expect(this.view.$el.is(':visible')).toEqual(true);
    });

    it('should toggle on remove', function() {
      this.todos.add([this.mockData, this.mockData]);
      expect(this.view.$el.is(':visible')).toEqual(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).toEqual(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).toEqual(false);
    });

    it('should toggle on reset', function() {
      this.todos.add(this.mockData);
      expect(this.view.$el.is(':visible')).toEqual(true);
      
      this.todos.reset([]);
      expect(this.view.$el.is(':visible')).toEqual(false);

      this.todos.reset([this.mockData]);
      expect(this.view.$el.is(':visible')).toEqual(true);
    });

  });

  describe('Renders Text', function() {
    it('should be empty', function() {
        expect(this.view.$el.text()).toEqual("");
    });

    it('should re-render on add', function() {
      this.todos.add(this.mockData);
      expect(this.view.$el.text()).toEqual("1 item left");

      this.todos.add([this.mockData,this.mockData]);
      expect(this.view.$el.text()).toEqual("3 items left");
    });

    it('should re-render on reset', function() {
      this.todos.reset([this.mockData,this.mockData]);
      expect(this.view.$el.text()).toEqual("2 items left");

      this.todos.reset([]);
      expect(this.view.$el.text()).toEqual("");
    });

    it('should re-render on remove', function() {
      this.todos.reset([this.mockData,this.mockData]);
      expect(this.view.$el.text()).toEqual("2 items left");

      this.todos.at(0).destroy();
      expect(this.view.$el.text()).toEqual("1 item left");

      this.todos.at(0).destroy();
      expect(this.view.$el.text()).toEqual("");
    });

    it('should re-render on change', function() {
      this.todos.add(this.mockData);

      this.todos.at(0).set('completed', true);
      expect(this.view.$el.text()).toEqual("0 items left");

      this.todos.at(0).set('completed', false);
      expect(this.view.$el.text()).toEqual("1 item left");
    });

  });

});