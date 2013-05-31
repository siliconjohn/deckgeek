
App.GameHero=Backbone.Model.extend({
  url:function(){
        return window.App.data.game_id;
      }
});

App.GameHeroView=Backbone.View.extend({
  tag:"div",
  className:"hero-unit game-hero-unit",
  template: JST['templates/games/gameheroview'],
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

function getGameHero(container,json){
  window.gameHero = new App.GameHero();
  window.gameHeroView = new App.GameHeroView({model: gameHero});
  window.gameHeroView.$el.appendTo(container);
  window.gameHero.set(json);

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
