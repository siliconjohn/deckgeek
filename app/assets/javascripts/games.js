window.App = window.App || {};

// Game model and view //////////////

App.Game=Backbone.Model.extend({

});

App.GameView=Backbone.View.extend({
  tag:"div",
  className:"game-view",
  template: _.template('rrr'),

  initialize:function(){
    _.bindAll(this,'render', 'remove');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  },

  remove:function(){
    this.model.destroy();
  }
});

// Games collection and view ////////

App.Games=Backbone.Collection.extend({
  model:App.Game,
  url:"/games"
});

App.GamesView=Backbone.View.extend({
  tag:"div",
  className:"games-view",

  initialize:function(){
    _.bindAll(this,'addGame');
    this.listenTo(this.collection,'add',this.addGame);
  },

  addGame: function(gameModel){
    var gameView=new App.GameView({model:gameModel});
    gameView.$el.appendTo(this.$el);
    gameView.render;
  }
});

function getGames(container){
  window.games = new App.Games();
  window.gamesView = new App.GamesView({collection: games});
  window.gamesView.$el.appendTo(container);
  window.gamesView.render();
  window.games.fetch();
}
