describe('View :: Task View', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/Todo', 'views/task/TaskView'], function(Todo, View) {
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

    it("should have a view task child", function(){
      expect(this.view.$el.children().length).toEqual(1);
      expect(this.view.child.className).toEqual('viewTaskView');
    });

  });

  describe('Handle Events', function() {
    
    it("should enter and exit edit mode", function(){
      this.view.child.trigger('edit');
      expect(this.view.child.className).toEqual('editTaskView');

      this.view.child.trigger('done');
      expect(this.view.child.className).toEqual('viewTaskView');
    });

  });

  describe('Handle Model', function() {

    it("should remove this.view when model is gone", function(){
      this.todo.destroy();
      waits(function(){
        expect($('#sandbox').children().length).toEqual(0);
      }, 150);
    });
    
  });

});