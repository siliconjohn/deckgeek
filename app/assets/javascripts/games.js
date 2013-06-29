
App.Game = Backbone.Model.extend(
{
  url: function()
  {
    var i = this.get( "id" );
    return i ? "/games/" + i : "/games";
  }
});

App.Games = Backbone.Collection.extend(
{
  model: App.Game,
  url: "/games"
});

App.GameView = Backbone.View.extend(
{
  tag: "div",
  className: "game-view",
  template: JST[ 'templates/games/gameview' ],
  events:
  {
    'click .delete-game-btn': 'delete',
    'click .edit-game-button' : 'editGame'
  },

  initialize: function()
  {
    _.bindAll( this, 'render', 'remove', 'delete', 'editGame');
    this.listenTo( this.model, 'change', this.render);
  },

  render: function()
  {
    this.$el.html( this.template( this.model.attributes ));

    // shuffle cards
    for(var i = this.model.attributes.cards.length - 1; i > 0; i--)
    {
        var j = Math.floor( Math.random() * ( i + 1 ));
        var temp = this.model.attributes.cards[i];
        this.model.attributes.cards[i] = this.model.attributes.cards[j];
        this.model.attributes.cards[j] = temp;
    }

    addCardsViewForJson( this.$el.find( ".game-bottom" ), this.model.attributes.cards, false, false);
  },

  remove: function()
  {
    this.model.destroy();
  },

  delete: function()
  {
    if( confirm( "Are you sure you want to delete this game?" ))
      this.model.destroy();
  },

  editGame: function()
  {
    window.location="/games/" + this.model.id ;
  }
});

App.GamesView = Backbone.View.extend(
{
  tag: "div",
  className: "games-view",
  template: JST[ 'templates/games/gamesview' ],
  events:
  {
    'click #new-game-button' : 'newGame'
  },

  initialize: function()
  {
    _.bindAll( this, 'addGame', 'render', 'newGame');
    this.listenTo( this.collection, 'add', this.addGame);
    this.listenTo( this.collection, 'remove', this.render);
  },

  render: function()
  {
    this.$el.html( this.template() );
    this.collection.each( this.addGame );
  },

  addGame: function( gameModel )
  {
    var gameView = new App.GameView({ model: gameModel });
    gameView.$el.appendTo( this.$( '.games-list' ))
    gameView.render();
  },

  newGame: function()
  {
    var name=prompt( "What do you want to name this game? (you can change it later)" );
    if( name )
    {
      game= new App.Game({ name:name });
      game.save({ name:name }, { success: function(){ this.collection.add( game ) }.bind( this )});
    }
  }
});

function addGameView(container)
{
  window.App.data.games = new App.Games();
  window.App.views.gamesView = new App.GamesView({ collection: window.App.data.games });
  window.App.views.gamesView.$el.appendTo( container );
  window.App.views.gamesView.render();
  window.App.data.games.fetch();
}
