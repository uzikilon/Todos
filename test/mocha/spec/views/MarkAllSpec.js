describe('View :: Mark All As Completed', function() {

  var mockData = { title: 'Foo Bar', timestamp: new Date().getTime() }, completedMock = _.extend({completed: true}, mockData);

  beforeEach(function(done) {
    var that = this;
    require(['models/Todo', 'views/MarkAll'], function(Todo, View) {
      that.todos = new Todo.Collection();
      that.view = new View({collection: that.todos});
      $('#sandbox').html(that.view.render().el);
      that.$checkbox = that.view.$(".icon-checkbox");
      done();
    });
  });

  afterEach(function() {
    this.view.remove();
  });


  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
     expect(this.view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on add', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).to.equal(true);
    });

    it('should toggle on remove', function() {
      this.todos.add([mockData, mockData]);
      expect(this.view.$el.is(':visible')).to.equal(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).to.equal(true);

      this.todos.at(0).destroy();
      expect(this.view.$el.is(':visible')).to.equal(false);
    });

    it('should toggle on reset', function() {
      this.todos.add(mockData);
      expect(this.view.$el.is(':visible')).to.equal(true);
      
      this.todos.reset([]);
      expect(this.view.$el.is(':visible')).to.equal(false);

      this.todos.reset([mockData]);
      expect(this.view.$el.is(':visible')).to.equal(true);
    });
    
  });

  describe('Renders', function() {
    it('should be unchecked', function() {
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);
      this.todos.add(mockData);
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);
    });

    it('should toggle on change', function() {
      this.todos.add(mockData);
      this.todos.at(0).set('completed', true);
      expect( this.$checkbox.hasClass('checked') ).to.equal(true);
      
      this.todos.add(mockData);
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);

      this.todos.at(1).set('completed', true);
      expect( this.$checkbox.hasClass('checked') ).to.equal(true);
    });

    it('should toggle on remove', function() {
      this.todos.add([mockData, completedMock]);
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);

      this.todos.at(0).destroy();
      expect( this.$checkbox.hasClass('checked') ).to.equal(true);

      this.todos.reset([mockData, completedMock]);
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);

      this.todos.at(1).destroy();
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);
    });

    it('should toggle on reset', function() {
      this.todos.add([completedMock, completedMock]);
      expect( this.$checkbox.hasClass('checked') ).to.equal(true);

      this.todos.reset([mockData]);
      expect( this.$checkbox.hasClass('checked') ).to.equal(false);

      this.todos.reset([completedMock]);
      expect( this.$checkbox.hasClass('checked') ).to.equal(true);
    });

  });
});