
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
  dragGridOn: false,
  events:
  {
    'click .jcard-text': 'selectTextArea'
  },

  initialize: function()
  {
    this.undoStack = new Array;
    this.redoStack = new Array;

    _.bindAll(this, 'render', 'selectedImage', 'saveForUndo', 'undo', 'redo',
      'saveForRedo', 'revertToSaved', 'enableDragAndResize', 'setBgImage', 'getCleanedHTML',
      'enableDragGrid', 'disableDragGrid', 'removeBgImage', 'setBgColor', 'updateHTMLPageUI',
      'bgImageSmaller', 'bgImageBigger', 'bdrSmaller', 'bdrBigger', 'setBdrColor', 'addTextArea',
      'selectTextArea', 'setTextAreaBgColor', 'setTextAreaBdrRadiusSmaller', 'setTextAreaBdrRadiusBigger',  'setTextAreaBdrSmaller',
      'setTextAreaBdrColor', 'setTextAreaBdrBigger', 'save' );

    this.listenTo(this.model, 'change', this.render);

    $("body").delegate( "", "selectedImage", this.selectedImage);
    $("body").delegate( "", "save", this.save);
    $("body").delegate( "", "undo", this.undo);
    $("body").delegate( "", "redo", this.redo);
    $("body").delegate( "", "revertToSaved", this.revertToSaved); 
    $("body").delegate( "", "enableDragGrid", this.enableDragGrid);
    $("body").delegate( "", "disableDragGrid", this.disableDragGrid);
    $("body").delegate( "", "removeBgImage", this.removeBgImage);
    $("body").delegate( "", "setBgColor", this.setBgColor);
    $("body").delegate( "", "bgImageBigger", this.bgImageBigger);
    $("body").delegate( "", "bgImageSmaller", this.bgImageSmaller);
    $("body").delegate( "", "bdrBigger", this.bdrBigger);
    $("body").delegate( "", "bdrSmaller", this.bdrSmaller);
    $("body").delegate( "", "setBdrColor", this.setBdrColor);
    $("body").delegate( "", "addTextArea", this.addTextArea); 
    $("body").delegate( "", "setTextAreaBgColor", this.setTextAreaBgColor);
    $("body").delegate( "", "setTextAreaBdrRadiusBigger", this.setTextAreaBdrRadiusBigger);
    $("body").delegate( "", "setTextAreaBdrRadiusSmaller", this.setTextAreaBdrRadiusSmaller);
    $("body").delegate( "", "setTextAreaBdrBigger", this.setTextAreaBdrBigger);
    $("body").delegate( "", "setTextAreaBdrSmaller", this.setTextAreaBdrSmaller);
    $("body").delegate( "", "setTextAreaBdrColor", this.setTextAreaBdrColor);
  },

  /////////////////////////////
  // Text Areas
  /////////////////////////////

  addTextArea:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    
    this.saveForUndo();

    this.$(".jcard").append('<div class="jcard-text"/>');
    this.enableDragAndResize();
  },

  selectTextArea:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    
    this.$('.jcard-text').removeClass('jselected');
    $(e.currentTarget).addClass('jselected');
  },
  
  setTextAreaBgColor:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    var target=this.$('.jcard-text.jselected');
   
    if (target.length == 0) return;
 
    if( e.color != target.css('background-color'))
    {
      this.saveForUndo();
      target.css('background-color', e.color);
    }
  },
 
  setTextAreaBdrColor:function(e)
  {
    if(!this.$el.hasClass('active'))return; 
   
    var target=this.$('.jcard-text.jselected');
   
    if (target.length == 0) return;

    if( e.color != target.css('border-color'))
    {
      this.saveForUndo();
      target.css('border-color', e.color);
    }
  },

  setTextAreaBdrSmaller:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    var target=this.$('.jcard-text.jselected');
    if (target.length == 0) return;

    var w=Math.round(parseFloat(target.css( 'borderTopWidth'))); // have to round for firefox, dont know why

    var newWidth = w - 1;

    if( newWidth != w && newWidth > -1 )
    {
      this.saveForUndo();
      target.css( 'border-top-width', newWidth + 'px' )
            .css( 'border-bottom-width', newWidth + 'px' )
            .css( 'border-left-width', newWidth + 'px' )
            .css( 'border-right-width', newWidth + 'px' );
    }
  },

  setTextAreaBdrBigger:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    var target=this.$('.jcard-text.jselected');
    if (target.length == 0) return;
 
    var w=Math.round(parseFloat(target.css( 'borderTopWidth'))); // have to round for firefox, dont know why
 
    var newWidth = w + 1;

    if( newWidth != w && newWidth <30 )
    {
      this.saveForUndo(); 
      target.css( 'border-top-width', newWidth + 'px' ) 
            .css( 'border-bottom-width', newWidth + 'px' ) 
            .css( 'border-left-width', newWidth + 'px' ) 
            .css( 'border-right-width', newWidth + 'px' );
    }
  },

  setTextAreaBdrRadiusBigger:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    var target=this.$('.jcard-text.jselected');
    if (target.length == 0) return;
 
    var w=Math.round(parseFloat(target.css( 'borderTopRightRadius'))); 

    var newWidth = w + 1;

    if( newWidth != w && newWidth < 100 )
    {
      this.saveForUndo();
      target.css( 'border-top-left-radius', newWidth + 'px' ) 
            .css( 'border-top-right-radius', newWidth + 'px' ) 
            .css( 'border-bottom-right-radius', newWidth + 'px' ) 
            .css( 'border-bottom-left-radius', newWidth + 'px' );
    }
  },

  setTextAreaBdrRadiusSmaller:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    var target=this.$('.jcard-text.jselected');
    if (target.length == 0) return;
 
    var w=Math.round(parseFloat(target.css( 'borderTopRightRadius'))); 

    var newWidth = w - 1;

    if( newWidth != w && newWidth > -1 )
    {
      this.saveForUndo();
      target.css( 'border-top-left-radius', newWidth + 'px' ) 
            .css( 'border-top-right-radius', newWidth + 'px' ) 
            .css( 'border-bottom-right-radius', newWidth + 'px' ) 
            .css( 'border-bottom-left-radius', newWidth + 'px' );
    }
  },
 
  /////////////////////////////
  // Border
  /////////////////////////////

  setBdrColor:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    var target = this.$(".jcard-border");
   
    if( e.color != target.css('border-color'))
    {
      this.saveForUndo();
      target.css('border-color', e.color);
    }
  },

  bdrSmaller:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    var target = this.$(".jcard-border");

    var w = Math.round(parseFloat(target.css( 'borderTopWidth'))); // have to round for firefox, dont know why

    var newWidth = w - 1;

    if( newWidth != w && newWidth > -1 )
    {
      this.saveForUndo();
      target.css( 'border-top-width', newWidth + 'px' ) 
            .css( 'border-bottom-width', newWidth + 'px' ) 
            .css( 'border-left-width', newWidth + 'px' ) 
            .css( 'border-right-width', newWidth + 'px' );
    }
  },

  bdrBigger:function(e)
  {
    if(!this.$el.hasClass('active'))return;
   
    var target = this.$(".jcard-border");

    var w = Math.round(parseFloat(target.css( 'borderTopWidth'))); // have to round for firefox, dont know why

    var newWidth = w + 1;

    if( newWidth != w && newWidth <150 )
    {
      this.saveForUndo();
      target.css( 'border-top-width', newWidth + 'px' ) 
            .css( 'border-bottom-width', newWidth + 'px' ) 
            .css( 'border-left-width', newWidth + 'px' ) 
            .css( 'border-right-width', newWidth + 'px' );
    }
  },
 
  /////////////////////////////
  // Background
  /////////////////////////////

  selectedImage:function(e)
  { 
    // TODO: this should set the image based on what is selected, bg or icon or text
    this.setBgImage(e);
  },

  setBgImage:function(e)
  { 
    if(!this.$el.hasClass('active'))return;

    this.saveForUndo();

    this.$('.jcard-bg-image').attr('src','/assets/images/'+e.model.attributes.url) 
                             .attr('alt',e.model.attributes.url) 
                             .attr('data-id',e.model.attributes.id) 
                             .draggable();
  },

  removeBgImage:function(e)
  {
    if(!this.$el.hasClass('active'))return;
    
    this.saveForUndo();
    
    this.$(".jcard-bg-image").removeAttr("src")
                             .removeAttr("alt");

    // this is monkey buisness to work in all browsers
    var c=this.$(".jcard-bg-image")[0].outerHTML;
    this.$(".jcard-bg-image").remove();
    this.$(".jcard").prepend(c);
  },

  bgImageSmaller:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    var img=this.$(".jcard-bg-image");

    if( img.attr("src") == undefined ) return;
    
    this.saveForUndo();

    img.animate({ width: '-=10px' }, { duration:250 });
  },

  bgImageBigger:function(e)
  {
    if(!this.$el.hasClass('active'))return;
   
    var img=this.$(".jcard-bg-image");
    
    if( img.attr("src") == undefined ) return;
    
    this.saveForUndo();
   
    img.animate({ width: '+=10px' }, { duration:250 });
  },

  setBgColor:function(e)
  {
    if(!this.$el.hasClass('active'))return;

    var target = this.$(".jcard");

    if( e.color != target.css('background-color'))
    {
      this.saveForUndo();
      target.css('background-color', e.color);
    }
  },

  /////////////////////////////
  // Grid 
  /////////////////////////////

  enableDragGrid:function(e)
  {
     this.dragGridOn = true;
     this.$(".jcard-bg-image, .jcard-text").draggable( "option", "grid", [ 8, 8 ] );
  },

  disableDragGrid:function(e)
  {
     this.dragGridOn =false;
     this.$(".jcard-bg-image, .jcard-text").draggable( "option", "grid", false );
  },

  /////////////////////////////
  // Undo/Redo 
  /////////////////////////////
  
  undo: function()
  {
    if(!this.$el.hasClass('active'))return;

    if(this.undoStack.length==0)return;
    
    this.saveForRedo();
    this.$el.html(this.undoStack.pop());
    this.enableDragAndResize();
    this.updateHTMLPageUI();
  },

  redo: function()
  {
    if(!this.$el.hasClass('active'))return;

    if(this.redoStack.length==0)return;

    this.saveForUndo();
    this.$el.html(this.redoStack.pop());
    this.enableDragAndResize();
    this.updateHTMLPageUI();
  },

  saveForUndo: function()
  {
    var html=this.getCleanedHTML(); 

    if(html != _.last(this.undoStack))
      this.undoStack.push(html);
  },

  saveForRedo: function()
  {
    var html=this.getCleanedHTML();
    
    if(html != _.last(this.redoStack))
      this.redoStack.push(html);
  },

  revertToSaved: function()
  {
    this.saveForUndo();
    this.render();
  },
  
  /////////////////////////////
  // Save
  /////////////////////////////
  
  save: function()
  {
    if(this.undoStack.length==0)return;
    
    this.model.set("html", this.getCleanedHTML());
    this.model.save();
  },

  getCleanedHTML: function()
  {
    var newElement = this.$el.clone();
        
    newElement.find('.jcard-bg-image, .jcard-text').removeClass('ui-resizable ui-draggable ui-draggable-disabled ui-state-disabled')
              .removeAttr("aria-disabled");

    newElement.find('.ui-resizable-handle').remove();
    
    return newElement.html();
  },

  /////////////////////////////
  // UI 
  /////////////////////////////
  
  render: function()
  {
    this.$el.html(this.model.attributes.html);
    this.enableDragAndResize();
    this.updateHTMLPageUI();
    return this;
  },

  enableDragAndResize: function()
  {
    this.$(".jcard-bg-image")
        .draggable()
        .on( "dragstart", function( event, ui )
        {
          this.saveForUndo();
        }.bind(this)); 

    this.$('.jcard-text').draggable().resizable({ handles: "n, e, s, w"});

    if(this.dragGridOn==true)
      this.enableDragGrid();
    else
      this.disableDragGrid();
  },

  // TODO: this is not done
  updateHTMLPageUI: function()
  {
    // var event=jQuery.Event("setBgColor");
    // event.color=this.$(".jcard").css('background-color');
    // $('body').trigger(event);
    // event2=jQuery.Event("setBdrColor");
    // event2.color=this.$(".jcard-border").css('border-color');
    // $('body').trigger(event2);
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
    _.bindAll(this, 'render', 'addJCardView', 'prevBtnClick', 'nextBtnClick', 'slid', 'updateHTMLPageUI' );
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
      this.updateHTMLPageUI();
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
      this.updateHTMLPageUI();
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

  updateHTMLPageUI: function()
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
//  window.App.views.jCardsView.updateHTMLPageUI();
}
