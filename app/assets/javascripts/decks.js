/******************************************
 * This is for displaying all of the decks
 ******************************************/

/******************************************
 * Deck Model
 ******************************************/

App.Deck = Backbone.Model.extend(
{
  url: function()
  {
    var gid = this.attributes.game_id;
    var id = this.get( "id" );
    return id ? "/games/" + gid + "/decks/" + id : "/games/" + gid + "/decks/";
  }
});

/******************************************
 * Decks Collection
 ******************************************/

App.Decks = Backbone.Collection.extend(
{
  gameId: "",
  model: App.Deck,

  initialize: function( array, options )
  {
    gameId = options.gameId;
  },

  url: function()
  {
    return "/games/" + gameId + "/decks" ;
  }
});

/******************************************
 * Deck View
 ******************************************/

App.DeckView = Backbone.View.extend(
{
  tag: "div",
  className: "deck-view",
  template: JST[ 'templates/decks/deckview' ],
  events:
  {
    'click .delete-deck-btn': 'delete',
    'click .edit-deck-button' : 'editDeck'
  },

  initialize: function()
  {
    _.bindAll( this, 'render', 'remove', 'delete', 'editDeck', 'alignCardsViews' );
    this.listenTo( this.model, 'change', this.render );
  },

  render: function()
  {
    this.$el.html( this.template( this.model.attributes ));
    addCardsView( this.$el.find( ".card-1" ), this.model.attributes.cards, false, false );
    this.alignCardsViews();
  },

  alignCardsViews: function()
  {
    var a=0;
    var opacity=1.0;

    this.$el.find('.card-view').each(function(card){
        $(this).attr("style",'left:'+ a + 'px;top:' + a + "px;opacity:" +opacity +";" );
      a+=40;
      opacity-=0.3;
    });

    var parent=this.$el.find('.cards-view');
    parent.children().each(function(i,li){parent.prepend(li)})

  },

  remove: function()
  {
    this.model.destroy();
  },

  delete: function()
  {
    if(confirm("Are you sure you want to delete this deck?"))
      this.model.destroy();
  },

  editDeck: function()
  {
    window.location = this.model.url();
  }
});

/******************************************
 * Decks View
 ******************************************/

App.DecksView = Backbone.View.extend(
{
  tag: "div",
  className: "decks-view",
  template: JST[ 'templates/decks/decksview' ],
  events:
  {
    'click #add-deck-btn' : 'newDeck'
  },

  initialize: function()
  {
    _.bindAll( this, 'addDeck', 'render', 'newDeck' );
    this.listenTo( this.collection, 'add', this.addDeck );
    this.listenTo( this.collection, 'remove', this.render );
  },

  render: function()
  {
    this.$el.html( this.template() );
    this.collection.each( this.addDeck );
  },

  addDeck: function( deckModel )
  {
    var deckView = new App.DeckView({ model: deckModel });
    deckView.$el.appendTo( this.$( '.decks-list' ))
    deckView.render();
  },

  newDeck: function()
  {
    var name = prompt( "What do you want to name this deck? (you can change it later)" );

    if( name )
    {
      deck = new App.Deck( );
      deck.save({ name: name, game_id: this.options.game_id },
            { success: function(){ this.collection.add( deck ) }.bind( this )});
    }
  }
});

/******************************************
 * Gets and adds the decks to a el
 ******************************************/

function getDecks( container, game_id )
{
  window.App.data.decks = new App.Decks( [], { gameId: game_id} );
  window.App.views.decksView = new App.DecksView({ collection: window.App.data.decks, game_id: game_id });
  window.App.views.decksView.$el.appendTo( container );
  window.App.views.decksView.render();
  window.App.data.decks.fetch();
}
