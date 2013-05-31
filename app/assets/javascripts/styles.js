
App.Style=Backbone.Model.extend({
});

App.StyleView=Backbone.View.extend({
  tag:"div",
  className:"item",
  template: JST['templates/styles/styleview'],
  events: {
    "click .card-style-btn": "click"
  },

  initialize:function(){
    _.bindAll(this,'render', 'remove', 'click');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));

    this.$el.find(".carosel-card").prepend(JST['templates/styles/'+
      this.model.attributes.template_name](this.model.attributes));
    this.$el.find(".card-view-base").addClass('card-view-shadow');
  },

  remove:function(){
    this.model.destroy();
  },

  click:function(){
    window.cardsView.setStyle(this.model.id);
  }
});

App.Styles=Backbone.Collection.extend({
  model:App.Style,
  url: "/styles.json"
});

App.StylesView=Backbone.View.extend({
  tag:"div",
  className:"collapse out",
  id:"card-style-carosel-parent",
  template: JST['templates/styles/stylesview'],

  initialize:function(){
    _.bindAll(this,'addStyle','render');
    this.listenTo(this.collection, 'add', this.addStyle);
  },

  render: function(){
    this.$el.html(this.template());
    this.collection.each(this.addStyle);
  },

  addStyle: function(styleModel){
    var styleView=new App.StyleView({model:styleModel});
    styleView.$el.appendTo(this.$('.carousel-inner'))

    // set first style card to active
    if(this.$('.carousel-inner').children().size()==1)
      styleView.$el.addClass("item active");

    styleView.render();
  }
});

function getStyles(container,json){
  window.styles = new App.Styles();
  window.stylesView = new App.StylesView({collection: styles});
  window.stylesView.$el.appendTo(container);
  window.styles.reset(json);
  window.stylesView.render();
}
