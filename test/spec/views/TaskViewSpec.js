describe('View :: Task View', function() {

  var view, todos, todo, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function(done) {
    require(['models/Todo', 'views/TaskView', 'backbone.localStorage'], function(Todo, View) {
      todo = new Todo.Model(mockData);
      todo.sync = function(){};
      view = new View({model: todo});
      $('#sandbox').append(view.render().el);
      done();
    });
  });

  afterEach(function() {
    view.$el.remove();
    todo.destroy();
    todo = null;
    todos = null;
  });

  describe('Render', function() {

    it("should represent model data", function(){
      expect(view.$('p').text()).to.equal(todo.get('title'));
      expect(view.$('.icon-checkbox').hasClass('checked')).to.equal(todo.get('completed'));
      todo.set('completed', !todo.get('completed'));
      expect(view.$('.icon-checkbox').hasClass('checked')).to.equal(todo.get('completed'));
    });

    it("should handel mouseover", function(){
      view.$el.trigger({type: 'mouseover'});
      expect(view.$el.hasClass('over')).to.equal(true);
      view.$el.trigger({type: 'mouseout'});
      expect(view.$el.hasClass('over')).to.equal(false);
    });
  
  });

  describe('Handle Events', function() {
    
    it("should enter edit mode on dblclick", function(){
      view.$('p').trigger('dblclick');
      expect(view.$el.hasClass('editing')).to.equal(true);
    });
    
    it("should exit edit mode on blur", function(){
      view.$('p').trigger('dblclick');
      expect(view.$el.hasClass('editing')).to.equal(true);

      view.$('input').blur();
      expect(view.$el.hasClass('editing')).to.equal(false);
    });

  it("should exit edit mode on ESC", function(){
      view.$('p').trigger('dblclick');
      expect(view.$el.hasClass('editing')).to.equal(true);

      $(".editbox").trigger({type: 'keyup', which: 27, keyCode: 27});

      expect(view.$el.hasClass('editing')).to.equal(false);
    });

  });

  describe('Handle Model', function() {

    it("should save on ENTER", function(){
      var title = "Foo Bar Baz";
      view.$('input').val(title);
      
      $(".editbox").trigger({type: 'keyup', which: 13, keyCode: 13});

      expect(todo.get('title')).to.equal(title);
    });

    it("should fail saving empty title", function(){
      var title = "";
      view.$('input').val(title);
      view.update();
      expect(todo.get('title')).to.not.equal(title);
    });

    it("should destroy model when hitting delete", function(done){
      
      // set up spys to confir callbacks are being called
      var spy = sinon.spy();
      todo.on('destroy', spy);
      view.on('remove', spy);

      view.$('a.icon-delete').click();

      expect(spy.callCount).to.equal(1);

      setTimeout(function(){
        expect(spy.callCount).to.equal(2);
        done();
      }, 150);
    });

    it("should remove view when hitting delete", function(done){
      view.on('remove', function(){
        expect($('#sandbox').children().length).to.equal(0);
        done();
      });
      view.$('a.icon-delete').click();
    });
    
  });

});