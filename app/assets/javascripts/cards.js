/******************************************
 * This is for displaying all of the cards
 * in a single deck
 ******************************************/

/******************************************
 * Card Model
 ******************************************/

/******************************************
 * New Card Model
 ******************************************/

App.Card = Backbone.Model.extend(
{
  deckId: "",
  gameId: "",

  initialize: function( array, options )
  {
    gameId = options.gameId;
    deckId = options.deckId;
  },

  url: function()
  {  
    var id = this.get( "id" );

    if( id == undefined )
      return  "/games/" +gameId + "/decks/" + deckId+ "/cards/";
    else
      return  "/games/" +gameId + "/decks/" + deckId+ "/cards/" + id;
  }
});


// App.Card = Backbone.Model.extend(
// {
//   // url: function()
//   // {

//   //   var deckid = this.attributes.deck_id;
//   //   var id = this.get( "id" );
//   //   return id ?  deckid + "/cards/" + id : deckid + "/cards/";
//   // }
// });

/******************************************
 * Cards collection
 ******************************************/

App.Cards = Backbone.Collection.extend(
{
  //deckId: "",
  model: App.Card,

  // initialize: function( array, options )
  // {
  //   if( options && options.deckId )
  //     deckId = options.deckId;
  // },

  // url: function()
  // {
  //   return deckId + "/cards";
  // }
});

/******************************************
 * Card view
 ******************************************/

App.CardView = Backbone.View.extend(
{
  className: "card-view",
  
  initialize: function()
  {
    _.bindAll( this, 'render');
    this.listenTo( this.model, 'change', this.render);
  },

  render: function()
  {
    this.$el.html(this.model.attributes.html);
  },

  // remove: function()
  // {
  //   this.model.destroy();
  // },

  // delete: function()
  // {
  //   if( confirm( "Are you sure you want to delete this card?" ))
  //     this.model.destroy();
  // },

  // edit:function()
  // {
  //   window.location=this.model.get("deck_id") +"/cards/" + this.model.id;
  // }
});

/******************************************
 * Cards view
 ******************************************/

App.CardsView = Backbone.View.extend(
{
  className: "cards-view",

  initialize:function()
  {
    _.bindAll( this, 'addCard', 'render');
    this.listenTo( this.collection, 'add', this.addCard);
    this.listenTo( this.collection, 'remove', this.render);
  },

  render:function()
  {
    this.$el.empty();
    this.collection.each( this.addCard );
  },

  addCard:function( cardModel )
  {  
    var cardView = new App.CardView({ model: cardModel});
    cardView.$el.appendTo(this.$el);
    cardView.render(); 
  },

  // newCard:function()
  // {
  //   var card;

  //   lastCard=this.collection.last();

  //   if(lastCard)
  //   {
  //     card=lastCard.clone();
  //     card.set('name','New Card');
  //     card.set('description','');
  //     card.set('id',null);
  //     card.set('created_at',null);
  //     card.set('updated_at',null);
  //   }
  //   else
  //     card=new App.Card({name:'New Card', style_id:1,background_id:1, deck_id:this.options.deck_id });
  //   card.save([], { success: function(){ this.collection.add( card ) }.bind( this )});
  // },
 
 
});

function addCardsView( container )
{
  window.App.data.cards = new App.Cards( [], { deckId: deck_id} );
  window.App.views.cardsView = new App.CardsView( { collection: window.App.data.cards });
  window.App.views.cardsView.$el.appendTo( container );
  window.App.views.cardsView.render();
  window.App.data.cards.fetch();
}

function addCardsViewForJson( container, json )
{
  window.App.views.cardsView = new App.CardsView( { collection: new App.Cards( json ) });
  window.App.views.cardsView.$el.appendTo( container );
  window.App.views.cardsView.render();
}
