define(function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  module('View :: Task View', {
    setup: function() {
      var that = this;
      stop();
      require(['models/Todo', 'views/TaskView'], function(Todo, View) {
        that.todo = new Todo.Model(mockData);
        that.todo.sync = function(){};
        that.view = new View({model: that.todo});
        $('#sandbox').html(that.view.render().el);
        start();
      });
    },
    teardown: function() {
      this.view.remove();
      this.todo.destroy();
    }
  });

  test("should represent model data", function(){
    equal(this.view.$('p').text(), this.todo.get('title'));
    equal(this.view.$('.icon-checkbox').hasClass('checked'), this.todo.get('completed'));
    this.todo.set('completed', !this.todo.get('completed'));
    equal(this.view.$('.icon-checkbox').hasClass('checked'), this.todo.get('completed'));
  });

  test("should handel mouseover", function(){
    this.view.$el.trigger({type: 'mouseover'});
    equal(this.view.$el.hasClass('over'), true);
    this.view.$el.trigger({type: 'mouseout'});
    equal(this.view.$el.hasClass('over'), false);
  });

  test("should enter edit mode on dblclick", function(){
    equal(this.view.$el.hasClass('editing'), false);
    this.view.$('p').trigger('dblclick');
    equal(this.view.$el.hasClass('editing'), true);
  });

  test("should exit edit mode on blur", function(){
    this.view.$('p').trigger('dblclick');
    equal(this.view.$el.hasClass('editing'), true);

    this.view.$('input').blur();
    equal(this.view.$el.hasClass('editing'), false);
  });

  test("should exit edit mode on ESC", function(){
    this.view.$('p').trigger('dblclick');
    this.view.$(".editbox").trigger({type: 'keyup', which: 27, keyCode: 27});
    equal(this.view.$el.hasClass('editing'), false);
  });

  test("should save on ENTER", function(){
    var title = "Foo Bar Baz";
    this.view.$('input').val(title);
    
    this.view.$(".editbox").trigger({type: 'keyup', which: 13, keyCode: 13});

    equal(this.todo.get('title'), title);
  });

  test("should fail saving empty title", function(){
    var title = "";
    this.view.$('input').val(title);
    this.view.update();
    ok(this.todo.get('title') !== title);
  });

  test("should destroy model when hitting delete", function(){
    expect(1);
    var spy = sinon.spy();
    this.todo.on('destroy', spy);

    this.view.$('a.icon-delete').click();

    equal(spy.callCount, 1);
  });

  test("should remove view when hitting delete", function(){
    this.view.$('a.icon-delete').click();
    stop();
    _.delay(function(){
      equal($('#sandbox').children().length, 0);
      start();
    }, 700);
  });
});