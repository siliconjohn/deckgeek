/******************************************
 * Game Hero Model
 ******************************************/

App.GameHeroModel = Backbone.Model.extend(
{
  url:function()
  {
    return "/games/" + this.attributes.id;
  }
});

/******************************************
 * Game Hero View
 ******************************************/

App.GameHeroView = Backbone.View.extend(
{
  className: "hero-unit game-hero-unit",
  template: JST[ 'templates/games/gameheroview' ],
  events:
  {
    'click #hero-save-btn': 'save',
  },

  initialize: function()
  {
    _.bindAll( this, 'render', 'save' );
    this.listenTo( this.model, 'change', this.render );
  },

  render: function()
  {
    this.$el.html( this.template( this.model.attributes ));
  },

  save: function()
  {
    var d=$("#input-description").val();
    var n=$("#input-name").val();

    this.model.set( "description", d );
    this.model.set( "name", n );
    this.model.save();
  }
});

/******************************************
 * Add Game Hero to a container
 ******************************************/

function addGameHero( container, json )
{
  window.App.data.gameHeroModel = new App.GameHeroModel();
  window.App.views.gameHeroView = new App.GameHeroView({ model: window.App.data.gameHeroModel });
  window.App.views.gameHeroView.$el.appendTo( container );
  window.App.data.gameHeroModel.set( json );

  // $(".hero-unit").hover(
  //   function()
  //   {
  //     $("#edit-btn").animate({ opacity: 1.0 }, 100)
  //   },
  //   // mouse out
  //   function(){
  //     $("#edit-btn").animate({ opacity: 0.0 }, 100)
  //   }
  // );
}
