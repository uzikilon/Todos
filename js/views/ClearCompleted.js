define(['backbone', 'underscore', 'helpers/ViewHelper'], function(Backbone, _, ViewHelper) {

  var template = _.template('Clear <%= count %> completed <%= items %>');

  var View = Backbone.View.extend({
    tagName: 'button',
    initialize: function(){
      var events = 'add reset remove change:completed';
      this.collection.on(events, this.render, this);
    },
    render: function() {
      var count = this.collection.completed().length;
      if( count ) {
        var items = ViewHelper.formatItem(count);
        this.$el.show().html( template({count: count, items: items}) );
      } else {
        this.$el.hide().empty();
      }
      return this;
    },
    events: {
      click: function() {
        var completed = this.collection.completed();
        _(completed).each(function(model){
          model.destroy();
        });
      }
    }
  });

  return View;
});