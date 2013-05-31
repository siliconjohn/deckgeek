
App.Game=Backbone.Model.extend({
});

App.GameView=Backbone.View.extend({
  tag:"div",
  className:"game-view",
  template: JST['templates/games/gameview'],
  events: {
    'click .delete-game-btn': 'delete',
    'click .edit-game-button' : 'editGame'
  },

  initialize:function(){
    _.bindAll(this,'render', 'remove', 'delete', 'editGame');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  },

  remove:function(){
    this.model.destroy();
  },

  delete:function(){
    if(confirm("Are you sure you want to delete this game?"))
      this.model.destroy();
  },

  editGame: function(){
    window.location="/games/" + this.model.id ;
  }
});

App.Games=Backbone.Collection.extend({
  model:App.Game,
  url:"/games"
});

App.GamesView=Backbone.View.extend({
  tag:"div",
  className:"games-view",
  template: JST['templates/games/gamesview'],
  events: {
    'click #new-game-button' : 'newGame'
  },

  initialize:function(){
    _.bindAll(this,'addGame','render', 'newGame');
    this.listenTo(this.collection,'add',this.addGame);
    this.listenTo(this.collection,'remove',this.render);
  },

  render: function(){
    this.$el.html(this.template());
    this.collection.each(this.addGame);
  },

  addGame: function(gameModel){
    var gameView=new App.GameView({model:gameModel});
    gameView.$el.appendTo(this.$('.games-list'))
    gameView.render();
  },

  newGame: function(){
    var name=prompt("What do you want to name this game? (you can change it later)");
    if(name)
    {
      game= new App.Game({name:name});
      this.collection.add(game);
      game.save();
    }
  }
});

function getGames(container){
  window.games = new App.Games();
  window.gamesView = new App.GamesView({collection: games});
  window.gamesView.$el.appendTo(container);
  window.gamesView.render();
  window.games.fetch();
}
