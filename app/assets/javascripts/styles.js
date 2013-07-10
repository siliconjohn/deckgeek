/******************************************
 * This is for displaying all of the styles
 ******************************************/

App.StyleView = Backbone.View.extend(
{
  tag: "div",
  className: "item",
  template: JST[ 'templates/styles/styleview' ],
  events:
  {
    "click .card-style-btn": "click"
  },

  initialize: function()
  {
    _.bindAll( this, 'click');
  },

  render: function()
  {
    this.$el.html( this.template( this.model.attributes ));
    this.template = JST['templates/styles/' + this.model.attributes.template_name];
    var r=this.template(this.model.attributes, { model: this.model });
    this.$el.find( ".carosel-card-parent" ).prepend( r );
    this.$el.find( ".card-view-base" ).addClass( 'card-view-shadow' );

    var h=this.model.get( "height" );
    var ph=(355-h)/2;
    this.$el.attr( "style", "margin-top:"+ph+"px");
  },

  click: function()
  {
    window.App.views.cardsView.setStyle(this.model.id);
  }
});

App.Styles = Backbone.Collection.extend(
{
  model: Backbone.Model,
  url: "/styles.json"
});

App.StylesView=Backbone.View.extend(
{
  tag: "div",
  className: "collapse out",
  id: "card-style-carosel-parent",
  template: JST['templates/styles/stylesview'],

  initialize: function()
  {
    _.bindAll( this, 'addStyle', 'render');
  },

  render: function()
  {
    this.$el.html( this.template());
    this.collection.each( this.addStyle );
  },

  addStyle: function(styleModel)
  {
    // get the style for the deck from the sample card
    // this is used to select the current style
    var deckStyleID = this.options.sampleCard.style_id;
    if (!deckStyleID) deckStyleID = 0;
    deckStyleID == styleModel.attributes.id ? doSelect = true : doSelect = false;

    // set attribs of sample card
    var temp=styleModel.attributes.id;
    styleModel.set(this.options.sampleCard );
    styleModel.set("id",temp);
    styleModel.attributes.style.height=styleModel.attributes.height;
    styleModel.attributes.style.width=styleModel.attributes.width;

    var styleView=new App.StyleView({ model: styleModel });
    styleView.$el.appendTo(this.$( '.carousel-inner' ))

    if ( doSelect ) styleView.$el.addClass( "item active" );

    styleView.render();
  }
});

function getStyles(container, json, cards, sampleCard)
{
  cards ? sample = cards : sample = sampleCard;

  window.App.views.stylesView = new App.StylesView({ collection: new App.Styles( json ), sampleCard:sample });
  window.App.views.stylesView.$el.appendTo( container );
  window.App.views.stylesView.render();
}
