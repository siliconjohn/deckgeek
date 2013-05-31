
App.Deck=Backbone.Model.extend({
  url: function() {
      if(this.id)
        return window.App.data.game_id + "/decks/" +this.id;
      else
        return window.App.data.game_id + "/decks/";
    }
});

App.DeckView=Backbone.View.extend({
  tag:"div",
  className:"deck-view",
  template: JST['templates/decks/deckview'],
  events: {
    'click .delete-deck-btn': 'delete',
    'click .edit-deck-button' : 'editDeck'
  },

  initialize:function(){
    _.bindAll(this,'render', 'remove', 'delete', 'editDeck');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  },

  remove:function(){
    this.model.destroy();
  },

  delete:function(){
    if(confirm("Are you sure you want to delete this deck?"))
      this.model.destroy();
  },

  editDeck: function(){
    window.location=this.model.url();
  }
});

App.Decks=Backbone.Collection.extend({
  model:App.Deck,
  url: function() {
      return window.App.data.game_id + "/decks";
    }
});

App.DecksView=Backbone.View.extend({
  tag:"div",
  className:"decks-view",
  template: JST['templates/decks/decksview'],
  events: {
    'click #add-deck-btn' : 'newDeck'
  },

  initialize:function(){
    _.bindAll(this,'addDeck','render', 'newDeck');
    this.listenTo(this.collection,'add',this.addDeck);
    this.listenTo(this.collection,'remove',this.render);
  },

  render: function(){
    this.$el.html(this.template());
    this.collection.each(this.addDeck);
  },

  addDeck: function(deckModel){
    var deckView=new App.DeckView({model:deckModel});
    deckView.$el.appendTo(this.$('.decks-list'))
    deckView.render();
  },

  newDeck: function(){
    var name=prompt("What do you want to name this deck? (you can change it later)");
    if(name)
    {
      deck= new App.Deck({name:name});
      this.collection.add(deck);
      deck.save();
    }
  }
});

function getDecks(container,json){
  window.decks = new App.Decks();
  window.decksView = new App.DecksView({collection: decks});
  window.decksView.$el.appendTo(container);
  window.decks.reset(json);
  window.decksView.render();
}
