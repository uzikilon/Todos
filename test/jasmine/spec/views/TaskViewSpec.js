describe('View :: Task View', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function() {
    var flag = false,
        that = this;

    require(['models/Todo', 'views/TaskView'], function(Todo, View) {
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
      expect(this.view.$('p').text()).toEqual(this.todo.get('title'));
      expect(this.view.$('.icon-checkbox').hasClass('checked')).toEqual(this.todo.get('completed'));
      this.todo.set('completed', !this.todo.get('completed'));
      expect(this.view.$('.icon-checkbox').hasClass('checked')).toEqual(this.todo.get('completed'));
    });

    it("should handel mouseover", function(){
      this.view.$el.trigger({type: 'mouseover'});
      expect(this.view.$el.hasClass('over')).toEqual(true);
      this.view.$el.trigger({type: 'mouseout'});
      expect(this.view.$el.hasClass('over')).toEqual(false);
    });
  
  });

  describe('Handle Events', function() {
    
    it("should enter edit mode on dblclick", function(){
      this.view.$('p').trigger('dblclick');
      expect(this.view.$el.hasClass('editing')).toEqual(true);
    });
    
    it("should exit edit mode on blur", function(){
      this.view.$('p').trigger('dblclick');
      expect(this.view.$el.hasClass('editing')).toEqual(true);

      this.view.$('input').blur();
      expect(this.view.$el.hasClass('editing')).toEqual(false);
    });

  it("should exit edit mode on ESC", function(){
      this.view.$('p').trigger('dblclick');
      expect(this.view.$el.hasClass('editing')).toEqual(true);

      $(".editbox").trigger({type: 'keyup', which: 27, keyCode: 27});

      expect(this.view.$el.hasClass('editing')).toEqual(false);
    });

  });

  describe('Handle Model', function() {

    it("should save on ENTER", function(){
      var title = "Foo Bar Baz";
      this.view.$('input').val(title);
      
      $(".editbox").trigger({type: 'keyup', which: 13, keyCode: 13});

      expect(this.todo.get('title')).toEqual(title);
    });

    it("should fail saving empty title", function(){
      var title = "";
      this.view.$('input').val(title);
      this.view.update();
      expect(this.todo.get('title')).not.toEqual(title);
    });

    it("should destroy model when hitting delete", function(){
      
      // set up spys to confirm callbacks are being called
      var spy = sinon.spy();
      this.todo.on('destroy', spy);
      this.view.on('remove', spy);

      this.view.$('a.icon-delete').click();

      expect(spy.callCount).toEqual(1);

      waits(function(){
        expect(spy.callCount).toEqual(2);
      }, 150);
    });

    it("should remove this.view when hitting delete", function(){
      this.view.$('a.icon-delete').click();
      waits(function(){
        expect($('#sandbox').children().length).toEqual(0);
      }, 50);
    });
    
  });

});