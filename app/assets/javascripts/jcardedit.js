
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
  undoStack: null,
  redoStack: null,
  bgDragOn: false,
  bgDragGridOn: false,

  initialize: function()
  {
    this.undoStack = new Array;
    this.redoStack = new Array;

    _.bindAll(this, 'render', 'selectedImage', 'saveForUndo', 'performUndo', 'performRedo',
      'saveForRedo', 'performRevert', 'enableDragBg', 'disableDragBg', 'setupDrag',
      'enableBgDragGrid', 'disableBgDragGrid', 'deleteBgImage', 'changeBgColor', 'updatePageUIForCard',
      'bgImageSmaller', 'bgImageBigger', 'bdrSmaller', 'bdrBigger', 'changeBdrColor' );

    this.listenTo(this.model, 'change', this.render);

    $("body").delegate( "", "selectedImage", this.selectedImage);
    $("body").delegate( "", "performUndo", this.performUndo);
    $("body").delegate( "", "performRedo", this.performRedo);
    $("body").delegate( "", "performRevert", this.performRevert);
    $("body").delegate( "", "enableDragBg", this.enableDragBg);
    $("body").delegate( "", "disableDragBg", this.disableDragBg);
    $("body").delegate( "", "enableBgDragGrid", this.enableBgDragGrid);
    $("body").delegate( "", "disableBgDragGrid", this.disableBgDragGrid);
    $("body").delegate( "", "deleteBgImage", this.deleteBgImage);
    $("body").delegate( "", "changeBgColor", this.changeBgColor);
    $("body").delegate( "", "bgImageBigger", this.bgImageBigger);
    $("body").delegate( "", "bgImageSmaller", this.bgImageSmaller);
    $("body").delegate( "", "bdrBigger", this.bdrBigger);
    $("body").delegate( "", "bdrSmaller", this.bdrSmaller);
    $("body").delegate( "", "changeBdrColor", this.changeBdrColor);
  },

  changeBdrColor:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    if( e.color != this.$(".jcard-border").css('border-color'))
    {
      this.saveForUndo();
      this.$(".jcard-border").css('border-color', e.color);
    }
  },

  bdrSmaller:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    var target = this.$(".jcard-border");

    var w=Math.round(parseFloat(target.css( 'borderTopWidth'))); // have to round for firefox, dont know why

    var newWidth = w - 1;

    if( newWidth != w && newWidth > -1 )
    {
      this.saveForUndo();
      target.css( 'border-top-width', newWidth + 'px' );
      target.css( 'border-bottom-width', newWidth + 'px' );
      target.css( 'border-left-width', newWidth + 'px' );
      target.css( 'border-right-width', newWidth + 'px' );
    }
  },

  bdrBigger:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    var target = this.$(".jcard-border");

    var w=Math.round(parseFloat(target.css( 'borderTopWidth'))); // have to round for firefox, dont know why

    var newWidth = w + 1;

    if( newWidth != w && newWidth <150 )
    {
      this.saveForUndo();
      target.css( 'border-top-width', newWidth + 'px' );
      target.css( 'border-bottom-width', newWidth + 'px' );
      target.css( 'border-left-width', newWidth + 'px' );
      target.css( 'border-right-width', newWidth + 'px' );
    }
  },

  bgImageSmaller:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    if(this.$(".jcard-bg-image").attr("src")==undefined)return;
    this.saveForUndo();
    this.$(".jcard-bg-image").animate({width: '-=10px'}, {duration:250});
  },

  bgImageBigger:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    if(this.$(".jcard-bg-image").attr("src")==undefined)return;
    this.saveForUndo();
    this.$(".jcard-bg-image").animate({width: '+=10px'}, {duration:250});
  },

  changeBgColor:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    if( e.color != this.$(".jcard").css('background-color'))
    {
      this.saveForUndo();
      this.$(".jcard").css('background-color', e.color);
    }
  },

  changeBgColor:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    if( e.color != this.$(".jcard").css('background-color'))
    {
      this.saveForUndo();
      this.$(".jcard").css('background-color', e.color);
    }
  },

  enableDragBg:function(e)
  {
    this.bgDragOn = true;
    this.$(".jcard-bg-image").draggable( "enable" );
  },

  disableDragBg:function(e)
  {
    this.bgDragOn = false;
    this.$(".jcard-bg-image").draggable( "disable" );
  },

  enableBgDragGrid:function(e)
  {
     this.bgDragGridOn = true;
     this.$(".jcard-bg-image").draggable( "option", "grid", [ 10, 10 ] );
  },

  disableBgDragGrid:function(e)
  {
     this.bgDragGridOn =false;
     this.$(".jcard-bg-image").draggable( "option", "grid", false );
  },

  deleteBgImage:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    this.saveForUndo();
    this.$(".jcard-bg-image").removeAttr("src");
    this.$(".jcard-bg-image").removeAttr("alt");
    var c=this.$(".jcard-bg-image")[0].outerHTML;
    this.$(".jcard-bg-image").remove();
    this.$(".jcard").prepend(c);
    this.setupDrag();
  },

  setupDrag:function()
  {
    var el = this.$(".jcard-bg-image");

    el.draggable();

    el.on( "dragstart", function( event, ui )
    {
      this.saveForUndo();
    }.bind(this));

    if(this.bgDragOn==false)
      el.draggable( "disable" );
    else
      el.draggable( "enable" );

    if(this.bgDragGridOn==true)
      this.enableBgDragGrid();
    else
      this.disableBgDragGrid();
  },

  selectedImage:function(e)
  {
    // if selected
    if(!this.$el.hasClass('active'))return;

    this.saveForUndo();

    // set new image
    this.$('.jcard-bg-image').attr('src','/assets/images/'+e.model.attributes.url);
    this.$('.jcard-bg-image').attr('alt',e.model.attributes.url);
    this.$('.jcard-bg-image').attr('data-id',e.model.attributes.id);
  },

  performUndo: function()
  {
    if(!this.$el.hasClass('active'))return;
    if(this.undoStack.length==0)return;
    this.saveForRedo();
    this.$el.html(this.undoStack.pop());
    this.setupDrag();
    this.updatePageUIForCard();
  },

  performRedo: function()
  {
    if(!this.$el.hasClass('active'))return;
    if(this.redoStack.length==0)return;
    this.saveForUndo();
    this.$el.html(this.redoStack.pop());
    this.setupDrag();
    this.updatePageUIForCard();
  },

  saveForUndo: function()
  {
    var html=this.$el.html();
    if(html != _.last(this.undoStack))
      this.undoStack.push(html);
  },

  saveForRedo: function()
  {
    var html=this.$el.html();
    if(html != _.last(this.redoStack))
    this.redoStack.push(html);
  },

  performRevert: function()
  {
    this.saveForUndo();
    this.render();
  },

  render:function()
  {
    this.$el.html(this.model.attributes.html);
    this.setupDrag();
    return this;
  },

  //this is for undo!
  updatePageUIForCard: function()
  {
    var event=jQuery.Event("setBgColor");
    event.color=this.$(".jcard").css('background-color');
    $('body').trigger(event);

    event2=jQuery.Event("setBdrColor");
    event2.color=this.$(".jcard-border").css('border-color');
    $('body').trigger(event2);
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
   "click #next-btn": 'nextBtnClick',
   "slid .carousel": 'slid'
  },

  initialize: function()
  {
    _.bindAll(this, 'render', 'addJCardView', 'prevBtnClick', 'nextBtnClick', 'slid', 'updatePageUIForCard' );
  },

  prevBtnClick: function()
  {
    var a=this.selectedIndex-1;

    if(a>=0)
    {
      this.selectedIndex=a;
      this.selectedCardView=$(this.$('.item')[a]).find('.jcard');
      this.selectedModel=_.indexOf(this.collection.models[a]);
      this.$('.carousel').carousel('prev');
      if(this.selectedIndex==0)this.$('#prev-btn').addClass('disabled');
      if(this.selectedIndex==this.collection.length-2)this.$('#next-btn').removeClass('disabled');
      this.updatePageUIForCard();
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
      this.$('.carousel').carousel('next');
      if(this.selectedIndex==this.collection.length-1)this.$('#next-btn').addClass('disabled');
      if(this.selectedIndex==1)this.$('#prev-btn').removeClass('disabled');
      this.updatePageUIForCard();
    }
  },

  render: function()
  {
    this.selectedIndex=-1;
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

  updatePageUIForCard: function()
  {
    var event=jQuery.Event("setBgColor");
    event.color=this.selectedCardView.css('background-color');
    $('body').trigger(event);

    event=jQuery.Event("setBdrColor");
    event.color=this.selectedCardView.find(".jcard-border").css('border-top-color');
    $('body').trigger(event);
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
  },

  slid: function()
  {
    // this is needed to stop accedital sliding
    // possible bootstrap bug
    this.$('.carousel').carousel({
      interval: false
    });

    this.$('.carousel').carousel('pause');
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
//  window.App.views.jCardsView.updatePageUIForCard();
}
