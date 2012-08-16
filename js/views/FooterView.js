define([
    'backbone',
    'views/ClearCompleted',
    'views/CountView'
  ], function(Backbone, ClearCompleted, CountView){

  var View = Backbone.View.extend({
    tagName: 'footer',
    initialize: function(){
      this.children = {
        countView: new CountView({collection: this.collection}),
        clearCompleted: new ClearCompleted({collection: this.collection})
      };

      this.$el.append(this.children.countView.render().el);
      this.$el.append(this.children.clearCompleted.render().el);

      this.collection.on('add remove reset', this.render, this);
    },
    render: function(){
      this.$el.css('display', this.collection.size() ? 'block' : 'none');
      return this;
    }
  });

  return View;

});