describe('View :: Task View', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: true };

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/TaskView'], function(Todo, View) {
      that.todo = new Todo.Model(mockData);
      that.todo.sync = function(){};
      that.view = new View({model: that.todo});
      $('#sandbox').html(that.view.render().el);
      done();
    });
  });


  afterEach(function() {
    this.view.remove();
    this.todo.destroy();
  });

  describe('Render', function() {

    it("should represent model data", function(){
      expect(this.view.$('p').text()).to.equal(this.todo.get('title'));
      expect(this.view.$('.icon-checkbox').hasClass('checked')).to.equal(this.todo.get('completed'));
      this.todo.set('completed', !this.todo.get('completed'));
      expect(this.view.$('.icon-checkbox').hasClass('checked')).to.equal(this.todo.get('completed'));
    });

    it("should handel mouseover", function(){
      this.view.$el.trigger({type: 'mouseover'});
      expect(this.view.$el.hasClass('over')).to.equal(true);
      this.view.$el.trigger({type: 'mouseout'});
      expect(this.view.$el.hasClass('over')).to.equal(false);
    });
  
  });

  describe('Handle Events', function() {
    
    it("should enter edit mode on dblclick", function(){
      this.view.$('p').trigger('dblclick');
      expect(this.view.$el.hasClass('editing')).to.equal(true);
    });
    
    it("should exit edit mode on blur", function(){
      this.view.$('p').trigger('dblclick');
      expect(this.view.$el.hasClass('editing')).to.equal(true);

      this.view.$('input').blur();
      expect(this.view.$el.hasClass('editing')).to.equal(false);
    });

  it("should exit edit mode on ESC", function(){
      this.view.$('p').trigger('dblclick');
      expect(this.view.$el.hasClass('editing')).to.equal(true);

      this.view.$(".editbox").trigger({type: 'keyup', which: 27, keyCode: 27});

      expect(this.view.$el.hasClass('editing')).to.equal(false);
    });

  });

  describe('Handle Model', function() {

    it("should save on ENTER", function(){
      var title = "Foo Bar Baz";
      this.view.$('input').val(title);
      
      this.view.$(".editbox").trigger({type: 'keyup', which: 13, keyCode: 13});

      expect(this.todo.get('title')).to.equal(title);
    });

    it("should fail saving empty title", function(){
      var title = "";
      this.view.$('input').val(title);
      this.view.update();
      expect(this.todo.get('title')).to.not.equal(title);
    });

    it("should destroy model when hitting delete", function(done){
      this.todo.on('destroy', function(){ done(); });
      this.view.$('a.icon-delete').click();
    });

    it("should remove view when hitting delete", function(done){
      this.view.on('remove', function(){
        expect(this.view.$('#sandbox').children().length).to.equal(0);
        done();
      }, this);
      this.view.$('a.icon-delete').click();
    });
    
  });

});