/******************************************
 * This is for displaying all of the decks
 * for for printing
 ******************************************/

/******************************************
 * Deck Model
 ******************************************/

App.PrintDeck = Backbone.Model.extend(
{
  // url: function()
  // {
  //   var gid = this.attributes.game_id;
  //   var id = this.get( "id" );
  //   return id ? "/games/" + gid + "/decks/" + id : "/games/" + gid + "/decks/";
  // }
});

/******************************************
 * Decks Collection
 ******************************************/

App.PrintDecks = Backbone.Collection.extend(
{
 // gameId: "",
  model: App.PrintDeck,

  // initialize: function( array, options )
  // {
  //   gameId = options.gameId;
  // },

  url: function()
  {
    //return "/games/" + gameId + "/decks" ;
  }
});

/******************************************
 * Deck View
 ******************************************/

App.PrintDeckView = Backbone.View.extend(
{
  className: "deck-view",
  template: JST[ 'templates/decks/deckview' ],
  events:
  {
    'click .print-deck-button': 'printToggle' 
  },

  initialize: function()
  {
    _.bindAll( this, 'render', 'printToggle', 'alignCardsViews' ); 
  },

  render: function()
  {
    this.$el.html( this.template( this.model.attributes ));
    addCardsViewForJson( this.$el.find( ".card-1" ), this.model.attributes.cards, false, false );
    this.alignCardsViews();
    var v = $( JST[ 'templates/print/printbuttons' ]()); 
    this.$el.find(".deck-name").append( v );
  },

  alignCardsViews: function()
  {
    var a=0;
    var opacity=1.0;

    this.$el.find( '.card-view' ).each(function(card)
    {
        $(this).attr( "style" , 'left:' + a + 'px;top:' + a + "px;opacity:" + opacity +";" );
      a+=40;
      opacity-=0.3;
    });

    var parent = this.$el.find( '.cards-view' );
    parent.children().each( function( i, li ){ parent.prepend( li ) })
  },

  printToggle: function(e)
  {
  	if ( $( e.currentTarget ).hasClass( 'btn-green' )) 
		{
			// turn off print
	 		$( e.currentTarget ).removeClass( 'btn-green' );
	 		$( e.currentTarget ).removeClass( 'active' );
	 		$( e.currentTarget ).addClass( 'btn-blue' ) ;
			$( e.currentTarget ).text( 'Print' );
		} 
		else
		{
			// turn on print
			$( e.currentTarget ).addClass( 'btn-green' ) ;
			$( e.currentTarget ).addClass( 'active' );
	 		$( e.currentTarget ).removeClass( 'btn-blue' ) ; 
	 		$( e.currentTarget ).text( 'Printing' );
		}
  }
});

/******************************************
 * Print Decks View
 ******************************************/

App.PrintDecksView = Backbone.View.extend(
{
  className: "decks-view",
  
  initialize: function()
  {
    _.bindAll( this, 'render', 'addDeck' );
  },

  render: function()
  {
    this.$el.empty();
    this.collection.each( this.addDeck );
  },

  addDeck: function( deckModel )
  {
    var printDeckView = new App.PrintDeckView({ model: deckModel });
    printDeckView.$el.appendTo( this.$el );
    printDeckView.render();
  }
});

/******************************************
 * Adds the decks to a el
 ******************************************/

function addDecksForPrinting( container, json )
{
  window.App.data.printDecks = new App.PrintDecks( json );
  window.App.views.printDecksView = new App.PrintDecksView({ collection: window.App.data.printDecks });
  window.App.views.printDecksView.$el.appendTo( container );
  window.App.views.printDecksView.render();
}

