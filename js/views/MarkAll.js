define(['backbone'], function(Backbone) {

  var template = '\
    <a href="#" class="icon-checkbox"></a>\
    <span>Mark all as complete</label>\
  ';

  var View = Backbone.View.extend({
    className: 'markAll',
    initialize: function() {
      this.collection.on('change:completed', this.toggleChecked, this);
      this.collection.on('reset add remove', this.render, this);
      this.$el.html(template).hide();
      this.$button = this.$('.icon-checkbox');
    },
    render: function() {
      this.$el.toggle(this.collection.size() > 0);
      this.toggleChecked();
      return this;
    },
    toggleChecked: function() {
      var hasRemaining = this.collection.size() > 0 && !this.collection.remaining().length;
      this.$button.toggleClass('checked', hasRemaining);
      return this;
    },
    events: {
      'click': function(e) {
        e.preventDefault();
        var checked = !this.$button.hasClass("checked");
        this.collection.each( function(todo){ todo.save({'completed': checked}); } );
        this.toggleChecked();
      }
    }
  });

  return View;
});