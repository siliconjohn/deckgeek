/******************************************
 * This is for displaying all of the cards
 * in a single deck
 ******************************************/

App.Card = Backbone.Model.extend(
{
  url: function()
  {
    return window.App.data.deck_id + "/cards/" + this.get("id");
  }

});

App.Cards=Backbone.Collection.extend(
{
  model: App.Card,

  url: function()
  {
    return window.App.data.deck_id + "/cards";
  }
});

App.CardView = Backbone.View.extend(
{
  tag: "div",
  className: "card-view",
  events:
  {
    'click .delete-card-btn': 'delete',
    'click .edit-card-btn' : 'edit'
  },

  initialize:function()
  {
    _.bindAll(this,'render', 'remove', 'delete', 'edit');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.template = JST['templates/styles/' + this.model.attributes.style.template_name];
    this.$el.html(this.template(this.model.attributes,{model: this.model}));
    this.$el.find(".card-view-base").addClass('card-view-shadow');

    if(this.options.addEditButtons)
    {
      // TODO: you can see the buttons move when the margin is added, fix
      var w=this.model.attributes.style.width;
      var ph=(w-152)/2;
      var v=$(JST['templates/cards/editdeletebuttons']()).attr( "style", "margin-left:"+ph+"px")

      //$(v).attr( "style", "margin-left:"+ph+"px");
      //console.log($(v).attr( "style", "margin-left:"+ph+"px"));
      this.$el.append(v);
      //this.$el.find('.edit-delete-buttons').attr( "style", "margin-left:"+ph+"px");
    }
  },

  remove:function()
  {
    this.model.destroy();
  },

  delete:function()
  {
    if(confirm("Are you sure you want to delete this card?"))
      this.model.destroy();
  },

  edit:function()
  {
    window.location=this.model.get("deck_id") +"/cards/" + this.model.id ;
    //window.location=window.App.data.deck_id +"/cards/" + this.model.id ;
  }
});

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
    _.bindAll(this, 'addCard', 'render', 'newCard', 'setStyle', 'center');
    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.render);
  },

  render:function()
  {
    this.collection.each(this.addCard);
    this.center();
  },

  addCard:function(cardModel)
  {
    var cardView = new App.CardView({ model: cardModel, addEditButtons: this.options.addEditButtons });
    cardView.$el.appendTo(this.$el);
    cardView.render();
  },

  newCard:function()
  {
    // TODO FIX NEW CARD ID FUCKED
    // // give the new card the style of the last in collection
    // lastCard=this.collection.last();

    // if(lastCard)
    //   card=new App.Card({name:'New Card', description:'', style_id:lastCard.get("style_id"),background_id:0,
    //    style:lastCard.get("style"), image:lastCard.get("image"), background: {url:"bg1.jpg"}});
    // else
    //   card=new App.Card({name:'New Card', description:'', style_id:1, style:{template_name:"style-1"}, image_id:1, image: {url:"image1.jpeg"}, background_id:0, background: {url:"bg1.jpg"}});

    // this.collection.add(card);
    // card.save();
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
    var cardWidth=this.$el.find('.card-view').first().width();
    var m=10;//this.$el.find('.card-view').first().css("margin-right")
    var pw=940;//this.$el.width();
    var cw=cardWidth+m;
    var cardsPerRow=Math.floor((pw+m)/cw);
    var margin=(pw-((cardsPerRow*cw)-m))/2;
    this.$el.attr("style", "margin-left: "+margin +"px");
  }
});

function addCardsView( container, json, addEditButtons )
{
  window.App.views.cardsView = new App.CardsView( { collection: new App.Cards( json ), addEditButtons: addEditButtons });
  window.App.views.cardsView.$el.appendTo( container );
  window.App.views.cardsView.render();

}
