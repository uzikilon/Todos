define(['backbone'], function(Backbone) {

  var template = '\
    <a href="#" class="icon-checkbox"></a>\
    <span>Mark all as complete</label>\
  ';

  var View = Backbone.View.extend({
    className: 'markAll',
    initialize: function(){
      this.collection.on('change:completed', this.check, this);
      this.collection.on('reset add remove', this.render, this);
      this.$el.html(template);
      this.$button = this.$('.icon-checkbox');
    },
    render: function() {
      this.$el.toggle(this.collection.size() > 0);
      this.check();
      return this;
    },
    check: function(){
      this.$button.toggleClass('checked', this.collection.size() > 0 && this.collection.remaining().length === 0);
      return this;
    },
    events: {
      'click .icon-checkbox': function(e) {
        e.preventDefault();
        var checked = !this.$button.hasClass("checked");
        this.collection.each( function(todo){ todo.save({'completed': checked}); } );
        this.check();
      }
    }
  });

  return View;
});