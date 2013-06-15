/******************************************
 * This is for displaying all of the cards
 * in a single deck
 ******************************************/

// Started POST "/games/1/decks/1/cards" for 127.0.0.1 at 2013-06-10 18:37:03 -0600
// Processing by CardsController#create as JSON
//   Parameters: {"name"=>"New Card", "description"=>"", "style_id"=>4, "style"=>{"template_name"=>"style-4"}, "image"=>{"url"=>"image3.jpeg"}, "background"=>{"url"=>"bg1.jpg"}, "game_id"=>"1", "deck_id"=>"1", "card"=>{"description"=>"", "name"=>"New Card", "deck_id"=>"1", "style_id"=>4}}
//   User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."id" = 1 LIMIT 1
//    (0.0ms)  begin transaction
//   SQL (7.7ms)  INSERT INTO "cards" ("background_id", "border_color", "border_radius", "border_style", "border_width", "created_at", "deck_id", "description", "image_id", "name", "style_id", "updated_at") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  [["background_id", nil], ["border_color", "#808080"], ["border_radius", 10], ["border_style", "solid"], ["border_width", #<BigDecimal:7fbefff10f70,'0.2E0',9(18)>], ["created_at", Tue, 11 Jun 2013 00:37:03 UTC +00:00], ["deck_id", 1], ["description", ""], ["image_id", nil], ["name", "New Card"], ["style_id", 4], ["updated_at", Tue, 11 Jun 2013 00:37:03 UTC +00:00]]
//    (1.0ms)  commit transaction
// Completed 201 Created in 13ms (Views: 0.4ms | ActiveRecord: 8.9ms)

App.Card = Backbone.Model.extend(
{
  url: function()
  {
    return window.App.data.deck_id + "/cards";
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
    this.$el.html(this.template(this.model.attributes));
    this.$el.find(".card-view-base").addClass('card-view-shadow');
    if(this.options.addEditButtons)
      this.$el.append( JST['templates/cards/editdeletebuttons']);
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
    _.bindAll(this, 'addCard', 'render', 'newCard', 'setStyle');
    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.render);
  },

  render:function()
  {
    this.collection.each(this.addCard);
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
  }
});

function addCardsView( container, json, addEditButtons )
{
  window.cards = new App.Cards();
  window.cardsView = new App.CardsView( { collection: cards, addEditButtons: addEditButtons });
  window.cardsView.$el.appendTo( container );
  window.cards.reset( json );
  window.cardsView.render();
}
