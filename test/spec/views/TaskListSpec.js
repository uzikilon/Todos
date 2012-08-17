describe('View :: Task List', function() {

  var view, todos, mockData = { title: 'Foo Bar', timestamp: new Date().getTime(), completed: false};

  beforeEach(function(done) {
    require(['models/Todo', 'views/TaskList'], function(Todo, View) {
      todos = new Todo.Collection();
      view = new View({collection: todos});
      $('#sandbox').append(view.render().el);
      done();
    });
  });

  afterEach(function(done) {
    view.on('done', function(){
      view.$el.remove();
      todos = null;
      done();
    });
  });

  var hideEffectDone = function () {
    _.delay(function(){ view.trigger('done'); }, 50);
  };

  describe('Sohws And Hides', function() {
   
    it('should be hidden', function() {
      expect(view.$el.is(':visible')).to.equal(false);
      hideEffectDone();
    });

    it('should toggle on add', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).to.equal(true);
      hideEffectDone();
    });
    
    it('should toggle on reset', function() {
      todos.add(mockData);
      expect(view.$el.is(':visible')).to.equal(true);
      
      todos.reset([]);
      expect(view.$el.is(':visible')).to.equal(false);

      todos.reset([mockData]);
      expect(view.$el.is(':visible')).to.equal(true);

      hideEffectDone();
    });
    
  });

  describe('Renders', function() {
    it('should be empty', function() {
        expect(view.$el.text()).to.equal("");
        hideEffectDone();
    });

    it("should be able to add a child", function(done){

      view.on('add', function(){
        expect(view.$('li').length).to.equal(1);
         hideEffectDone();
         done();
      });
      todos.add(mockData);
    });

    it("should be able to add children", function(done){
      view.on('add', function(){
        expect(view.$('li').length).to.equal(4);
        hideEffectDone();
        done();
      });
      todos.reset([mockData,mockData,mockData,mockData]);
    });

  });

});