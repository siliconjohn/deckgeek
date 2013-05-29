window.App = window.App || {};

App.CardHero=Backbone.Model.extend({
  url:function(){
        return window.App.data.card_id;
      }
});

App.CardHeroView=Backbone.View.extend({
  tag:"div",
  className:"hero-unit card-hero-unit",
  template: JST['templates/cards/cardheroview'],

  initialize:function(){
    _.bindAll(this,'render');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  }
});

function getCardHero(container,json){
  window.cardHero = new App.CardHero();
  window.cardHeroView = new App.CardHeroView({model: cardHero});
  window.cardHeroView.$el.appendTo(container);
  window.cardHero.set(json);
}
