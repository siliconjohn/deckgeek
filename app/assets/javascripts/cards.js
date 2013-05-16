window.App = window.App || {};

App.Card=Backbone.Model.extend({

});

App.CardView=Backbone.View.extend({
  tag:'div',
  className:'card-view',
  template: JST['templates/games/cardview'],
  events: {
    'click .delete-card-btn': 'delete',
    'click .edit-card-button' : 'editCard'
  },

  initialize:function(){
    _.bindAll(this,'render', 'remove', 'delete', 'editCard');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  },

  remove:function(){
    this.model.destroy();
  },

  delete:function(){
    if(confirm("Are you sure you want to delete this card?"))
      this.model.destroy();
  },

  editGame: function(){

  }

});

// Card collection and view /////////////

App.Cards=Backbone.Collection.extend(
{
 // model:App.Card;
});

App.CardsView=Backbone.View.extend({
  tag:'div',
  className:'cards-view',


});

