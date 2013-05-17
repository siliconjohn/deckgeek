window.App = window.App || {};

// Card model and view //////////////

App.Card=Backbone.Model.extend({
});

App.CardView=Backbone.View.extend({
  tag:"div",
  className:"card-view",
  template: JST['templates/cards/cardview'],
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

  editCard: function(){
    window.location="/cards/" + this.model.id ;
  }
});

// Cards collection and view ////////

App.Cards=Backbone.Collection.extend({
  model:App.Card,
  url: function() {
      return window.App.data.deck_id + "/cards";
    }
});

App.CardsView=Backbone.View.extend({
  tag:"div",
  className:"cards-view",
  template: JST['templates/cards/cardsview'],
  events: {
    'click .new-card-button' : 'newCard'
  },

  initialize:function(){
    _.bindAll(this,'addCard','render', 'newCard');
    this.listenTo(this.collection,'add',this.addCard);
    this.listenTo(this.collection,'remove',this.render);
  },

  render: function(){
    this.$el.html(this.template());
    this.collection.each(this.addCard);
  },

  addCard: function(cardModel){
    var cardView=new App.CardView({model:cardModel});
    cardView.$el.appendTo(this.$('.cards-list'))
    cardView.render();
  },

  newCard: function(){
    var name=prompt("What do you want to name this card? (you can change it later)");
    if(name)
    {
      card= new App.Card({name:name});
      this.collection.add(card);
      card.save();
    }
  }
});

function getCards(container){
  window.cards = new App.Cards();
  window.cardsView = new App.CardsView({collection: cards});
  window.cardsView.$el.appendTo(container);
  window.cardsView.render();
  window.cards.fetch();
}
