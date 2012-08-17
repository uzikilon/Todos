describe('View :: Task View', function() {

  var view, todo, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function() {
    var flag = false;
    waitsFor(function() {
      require(['models/Todo', 'views/TaskView'], function(Todo, View) {
        todo = new Todo.Model(mockData);
        todo.sync = function(){};
        view = new View({model: todo});
        $('#sandbox').html(view.render().el);
        flag = true;
      });
      return flag;
    }, "Create Models", ASYNC_TIMEOUT);
  });

  afterEach(function() {
    view.$el.remove();
    todo.destroy();
    todo = null;
  });

  describe('Render', function() {

    it("should represent model data", function(){
      expect(view.$('p').text()).toEqual(todo.get('title'));
      expect(view.$('.icon-checkbox').hasClass('checked')).toEqual(todo.get('completed'));
      todo.set('completed', !todo.get('completed'));
      expect(view.$('.icon-checkbox').hasClass('checked')).toEqual(todo.get('completed'));
    });

    it("should handel mouseover", function(){
      view.$el.trigger({type: 'mouseover'});
      expect(view.$el.hasClass('over')).toEqual(true);
      view.$el.trigger({type: 'mouseout'});
      expect(view.$el.hasClass('over')).toEqual(false);
    });
  
  });

  describe('Handle Events', function() {
    
    it("should enter edit mode on dblclick", function(){
      view.$('p').trigger('dblclick');
      expect(view.$el.hasClass('editing')).toEqual(true);
    });
    
    it("should exit edit mode on blur", function(){
      view.$('p').trigger('dblclick');
      expect(view.$el.hasClass('editing')).toEqual(true);

      view.$('input').blur();
      expect(view.$el.hasClass('editing')).toEqual(false);
    });

  it("should exit edit mode on ESC", function(){
      view.$('p').trigger('dblclick');
      expect(view.$el.hasClass('editing')).toEqual(true);

      $(".editbox").trigger({type: 'keyup', which: 27, keyCode: 27});

      expect(view.$el.hasClass('editing')).toEqual(false);
    });

  });

  describe('Handle Model', function() {

    it("should save on ENTER", function(){
      var title = "Foo Bar Baz";
      view.$('input').val(title);
      
      $(".editbox").trigger({type: 'keyup', which: 13, keyCode: 13});

      expect(todo.get('title')).toEqual(title);
    });

    it("should fail saving empty title", function(){
      var title = "";
      view.$('input').val(title);
      view.update();
      expect(todo.get('title')).not.toEqual(title);
    });

    it("should destroy model when hitting delete", function(){
      
      // set up spys to confirm callbacks are being called
      var spy = sinon.spy();
      todo.on('destroy', spy);
      view.on('remove', spy);

      view.$('a.icon-delete').click();

      expect(spy.callCount).toEqual(1);

      waits(function(){
        expect(spy.callCount).toEqual(2);
      }, 150);
    });

    it("should remove view when hitting delete", function(){
      view.$('a.icon-delete').click();
      waits(function(){
        expect($('#sandbox').children().length).toEqual(0);
      }, 50);
    });
    
  });

});