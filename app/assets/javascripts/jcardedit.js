
/******************************************
 * JCard Model
 ******************************************/

App.JCardModel = Backbone.Model.extend(
{
  url:function()
  {
    return this.get("id");
  },

  parse:function(resp, xhr)
  {
  }
});

/******************************************
 * JCardCollection  
 ******************************************/

App.JCardCollection = Backbone.Collection.extend(
{
  model: App.JCardModel
});

/******************************************
 * JCardView  
 ******************************************/

App.JCardView = Backbone.View.extend(
{
  className: "item",

  initialize: function()
  {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.$el.html(this.model.attributes.html); 
    return this;
  }
});

/******************************************
 * JCardsView  
 ******************************************/

App.JCardsView = Backbone.View.extend(
{
  className:"card-carousels-view",
  template: JST['templates/card/jcardcarouselsview'],
  selectedCardView: null,
  selectedModel: null,
  selectedIndex: null,
  events:
  {
   "click #prev-btn": 'prevBtnClick',
   "click #next-btn": 'nextBtnClick'
  },
  
  initialize: function()
  {
    _.bindAll(this, 'render', 'addJCardView', 'prevBtnClick', 'nextBtnClick' );
  },

  prevBtnClick: function()
  {
    var a=this.selectedIndex-1;

    if(a>=0)
    {
      this.selectedIndex=a;
      this.selectedCardView=$(this.$('.item')[a]).find('.jcard');
      this.selectedModel=_.indexOf(this.collection.models[a]);
      //this.$('.carousel').carousel('prev'); 
 

      if(this.selectedIndex==0)
        this.$('#prev-btn').addClass('disabled');

      if(this.selectedIndex==this.collection.length-2)
        this.$('#next-btn').removeClass('disabled');
    }   
  },

  nextBtnClick:function()
  {
    var a=this.selectedIndex+1;

    if(a<this.collection.length)
    {
      this.selectedIndex=a;
      this.selectedCardView=$(this.$('.item')[a]).find('.jcard');
      this.selectedModel=_.indexOf(this.collection.models[a]);
      //this.$('.carousel').carousel('next');
 

      if(this.selectedIndex==this.collection.length-1)
        this.$('#next-btn').addClass('disabled');

      if(this.selectedIndex==1)
        this.$('#prev-btn').removeClass('disabled');
    }
  },

  render: function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addJCardView);

    // setup next prev buttons
    if(this.selectedIndex==this.collection.length-1)
      this.$('#next-btn').addClass('disabled');
    else
      this.$('#next-btn').removeClass('disabled');
      
    if(this.selectedIndex==0)
      this.$('#prev-btn').addClass('disabled');
    else
      this.$('#prev-btn').removeClass('disabled');
    
    // remove if only one card
    if (this.collection.length<2)
      $('#next-prev-btns').css('display','none');
    else
      $('#next-prev-btns').css('display','inline-block');

    return this;
  },

  addJCardView: function(model)
  {
    var modelView = new App.JCardView({model:model});
    modelView.$el.appendTo(this.$('.carousel-inner'));
    modelView.render();

    if( this.options.selectID == model.id )
    {
      modelView.$el.addClass('active');
      active='class="active"';
      this.selectedCardView=modelView;
      this.selectedModel=model;
      this.selectedIndex=_.indexOf(this.collection.models,model);
    }
    else
      active='';
  }
});

/******************************************
 * Add the JCardView to the DOM
 ******************************************/

function addJCards(container, id, cards)
{
  window.App.data.jCardModels = new App.JCardCollection(cards);
  window.App.views.jCardsView = new App.JCardsView({model: window.App.data.jCardModels.findWhere({id: id}),
                                                    collection: window.App.data.jCardModels,
                                                    selectID:id});
  window.App.views.jCardsView.$el.appendTo(container);
  window.App.views.jCardsView.render();
}