/******************************************
 * This is for displaying all of the cards
 * in a single deck
 ******************************************/

/******************************************
 * Card Model
 ******************************************/

App.Card = Backbone.Model.extend(
{
  url: function()
  {

    var deckid = this.attributes.deck_id;
    var id = this.get( "id" );
    return id ?  deckid + "/cards/" + id : deckid + "/cards/";
  }
});

/******************************************
 * Cards collection
 ******************************************/

App.Cards = Backbone.Collection.extend(
{
  deckId: "",
  model: App.Card,

  initialize: function( array, options )
  {
    if( options && options.deckId )
      deckId = options.deckId;
  },

  url: function()
  {
    return deckId + "/cards";
  }
});

/******************************************
 * Card view
 ******************************************/

App.CardView = Backbone.View.extend(
{
  tag: "div",
  className: "card-view",
  events:
  {
    'click .delete-card-btn': 'delete',
    'click .edit-card-btn' : 'edit'
  },

  initialize: function()
  {
    _.bindAll( this, 'render', 'remove', 'delete', 'edit');
    this.listenTo( this.model, 'change', this.render);
  },

  render: function()
  {
    this.template = JST[ 'templates/styles/' + this.model.attributes.style.template_name ];
    this.$el.html(this.template( this.model.attributes, { model: this.model }));
    this.$el.find( ".card-view-base" ).addClass( 'card-view-shadow' );

    if( this.options.addEditButtons )
    {
      var w = this.model.attributes.style.width;
      var ph = ( w - 152 ) / 2;
      var v = $( JST[ 'templates/cards/editdeletebuttons' ]()).attr( "style", "margin-left:" + ph + "px" )
      this.$el.append( v );
    }
  },

  remove: function()
  {
    this.model.destroy();
  },

  delete: function()
  {
    if( confirm( "Are you sure you want to delete this card?" ))
      this.model.destroy();
  },

  edit:function()
  {
    window.location=this.model.get("deck_id") +"/cards/" + this.model.id;
  }
});

/******************************************
 * Cards view
 ******************************************/

App.CardsView = Backbone.View.extend(
{
  tag: "div",
  className: "cards-view",
  events:
  {
    'click #add-card-btn' : 'newCard'
  },

  initialize:function()
  {
    _.bindAll( this, 'addCard', 'render', 'newCard', 'setStyle', 'center' );
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
    var cardView = new App.CardView({ model: cardModel, addEditButtons: this.options.addEditButtons });
    cardView.$el.appendTo(this.$el);
    cardView.render();
    this.center();
  },

  newCard:function()
  {
    var card;

    lastCard=this.collection.last();

    if(lastCard)
    {
      card=lastCard.clone();
      card.set('name','New Card');
      card.set('description','');
      card.set('id',null);
      card.set('created_at',null);
      card.set('updated_at',null);
    }
    else
      card=new App.Card({name:'New Card', style_id:1,background_id:1, deck_id:this.options.deck_id });

    card.save([], { success: function(){ this.collection.add( card ) }.bind( this )});
  },

  setStyle:function( style_id )
  {
    this.collection.each(function( card )
    {
      card.set('style_id', style_id );
      card.set( 'style', { template_name: "style-"+style_id } );
      card.save();
    });

    this.center();
  },

  center: function()
  {
    if(!this.options.center) return;
    var cardWidth=this.$el.find('.card-view').first().width();
    var m=10;
    var pw=940;
    var cw=cardWidth+m;
    var cardsPerRow=Math.floor((pw+m)/cw);
    var margin=(pw-((cardsPerRow*cw)-m))/2;
    this.$el.attr("style", "margin-left: "+margin +"px");
  }
});

function addCardsView( container, deck_id, addEditButtons, center )
{
  window.App.data.cards = new App.Cards( [], { deckId: deck_id} );
  window.App.views.cardsView = new App.CardsView( { collection: window.App.data.cards,
                               addEditButtons: addEditButtons, center:center, deck_id:deck_id });
  window.App.views.cardsView.$el.appendTo( container );
  window.App.views.cardsView.render();
  window.App.data.cards.fetch();
}

/*****************************************
 * This is inteded to just view cards, no
 * edit or delete cause the url for the
 * model/collection will be wrong
 ******************************************/

function addCardsViewForJson( container, json, addEditButtons, center )
{
  window.App.views.cardsView = new App.CardsView( { collection: new App.Cards( json ), addEditButtons: addEditButtons, center:center });
  window.App.views.cardsView.$el.appendTo( container );
  window.App.views.cardsView.render();
}
