window.App = window.App || {};

App.DeckHero=Backbone.Model.extend({
  url:function(){
        return window.App.data.deck_id;
      }
});

App.DeckHeroView=Backbone.View.extend({
  tag:"div",
  className:"hero-unit deck-hero-unit",
  template: JST['templates/decks/deckheroview'],
  events: {
    'click #hero-save-btn': 'save',
  },

  initialize:function(){
    _.bindAll(this,'render', 'save');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  },

  save: function(){
    this.model.set("name",$("#input-name").val());
    this.model.set("description",$("#input-description").val());
    this.model.save();
  }
});

function getDeckHero(container){
  window.deckHero = new App.DeckHero();
  window.deckHeroView = new App.DeckHeroView({model: deckHero});
  window.deckHeroView.$el.appendTo(container);
  window.deckHero.fetch();

  $(".hero-unit").hover(
    function(){
      $("#edit-btn").animate({ opacity: 1.0 }, 100)
       },
    // mouse out
    function(){
      $("#edit-btn").animate({ opacity: 0.0 }, 100)
    }
  );
}
