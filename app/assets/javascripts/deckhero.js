/******************************************
 * Deck Hero Model
 ******************************************/

App.DeckHero = Backbone.Model.extend(
{
  url:function()
  {
    return this.attributes.id;
  }
});
 
/******************************************
 * Deck Hero View
 ******************************************/

App.DeckHeroView = Backbone.View.extend(
{
  tag: "div",
  className: "hero-unit deck-hero-unit",
  template: JST['templates/decks/deckheroview'],
  events: 
  {
    'click #hero-save-btn': 'save',
  },

  initialize:function()
  {
    _.bindAll( this, 'render', 'save' );
    this.listenTo( this.model, 'change', this.render );
  },

  render:function()
  {
    this.$el.html( this.template( this.model.attributes ));
  },

  save:function()
  {
    this.model.set( "name", $( "#input-name" ).val() );
    this.model.set( "description", $( "#input-description" ).val() );
    this.model.save();
  }
});

function getDeckHero( container, json )
{
  window.App.data.deckHero = new App.DeckHero();
  window.App.views.deckHeroView = new App.DeckHeroView({ model: window.App.data.deckHero });
  window.App.views.deckHeroView.$el.appendTo( container );
  window.App.data.deckHero.set( json );

  $(".hero-unit").hover(
    function(){
      $("#edit-btn").animate({ opacity: 1.0 }, 100)
    },
    function(){
      $("#edit-btn").animate({ opacity: 0.0 }, 100)
    }
  );
}
