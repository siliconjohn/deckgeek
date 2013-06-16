/******************************************
 * This is for displaying all of the style
 ******************************************/

App.StyleView = Backbone.View.extend(
{
  tag: "div",
  className: "item",
  template: JST['templates/styles/styleview'],
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
    this.$el.find( ".carosel-card-parent" ).prepend( JST['templates/styles/'+
        this.model.attributes.template_name]( this.model.attributes ));
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
    // needs ref to itself to render the template properly
    styleModel.set( "style", styleModel.attributes );
    var styleView=new App.StyleView({ model: styleModel });

    styleView.$el.appendTo(this.$( '.carousel-inner' ))

    if(this.$( '.carousel-inner' ).children().size()==1)
      styleView.$el.addClass( "item active" );

    styleView.render();
  }
});

function getStyles(container, json)
{
  window.App.views.stylesView = new App.StylesView({ collection: new App.Styles( json ) });
  window.App.views.stylesView.$el.appendTo( container );
  window.App.views.stylesView.render();
}
