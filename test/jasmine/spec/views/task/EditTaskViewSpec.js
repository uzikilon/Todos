describe('View :: Edit Task View', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/Todo', 'views/task/EditTaskView'], function(Todo, View) {
      that.todo = new Todo.Model(mockData);
      that.todo.sync = function(){};
      that.view = new View({model: that.todo});
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

  describe('Render', function() {

    it("should represent model data", function(){
      expect(this.view.$input.val()).toEqual(this.todo.get('title'));
    });

  });

  describe('Handle Events', function() {

    it("should exit on blur", function(){
      var spy = jasmine.createSpy();
      this.view.on('done', spy);
      this.view.$input.blur();
      expect(spy.callCount).toEqual(1);
    });

  it("should exit on ESC", function(){
      var spy = jasmine.createSpy();
      this.view.on('done', spy);
      this.view.$input.trigger({type: 'keyup', which: 27, keyCode: 27});
      expect(spy.callCount).toEqual(1);
    });
  
    it("should save on ENTER", function(){
      var title = "Foo Bar Baz";
      this.view.$input.val(title);
      this.view.$el.submit();
      expect(this.todo.get('title')).toEqual(title);
    });

    it("should fail saving empty title", function(){
      var title = "";
      this.view.$input.val(title);
      this.view.$el.submit();
      expect(this.todo.get('title')).not.toEqual(title);
    });
    
  });

});