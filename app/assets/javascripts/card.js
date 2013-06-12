/******************************************
 * This is for displaying one card
 * and all of the UI needed to edit it.
 ******************************************/

/////////////////////////////
// Card Model
/////////////////////////////

App.CardModel = Backbone.Model.extend(
{
  url:function()
  {
    return this.get("id");
  },

  parse:function(resp, xhr)
  {
  }
});

/////////////////////////////
// Card Preview View
/////////////////////////////

App.CardPreviewView=Backbone.View.extend(
{
  tag:"div",
  id:"card-preview-view",

  initialize:function()
  {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.template = JST['templates/styles/'+this.model.attributes.style.template_name];
    this.$el.html(this.template(this.model.attributes));
    this.$el.find(".card-view-base").addClass('card-view-shadow center');
    return this;
  }
});

/////////////////////////////
// Color Picker View       //
/////////////////////////////

// TODO: this can only have one instace on a page
// TODO: add better css styles, change startup position
App.ColorPickerView = Backbone.View.extend(
{
  tag:"span",

  initialize:function()
  {
    _.bindAll(this, 'render', 'changeColor');
   this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    if(!$.jPicker.List[0])
    {
      this.$el.jPicker(
      {
            window:
            {
              expandable:true,
              position:{x:-50}
            },
            color:
            {
              alphaSupport:false,
              active:new $.jPicker.Color({hex: this.model.get(this.options.atrib)})
            }
        },

        this.changeColor, this.changeColor, this.changeColor
      );
    }
    return this;
  },

  changeColor:function(color, context)
  {
    this.model.set("border_color", '#'+$.jPicker.List[0].color.active.val('hex'))
  }
});

/////////////////////////////
// Background Image
/////////////////////////////

App.BackgroundsCollection = Backbone.Collection.extend(
{
  model: Backbone.Model
});

App.BackgroundView = Backbone.View.extend(
{
  tag: "div",
  className: "item",
  template: JST['templates/card/backgroundview'],

  initialize:function()
  {
    _.bindAll(this, 'render', 'remove');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

App.BackgroundsView = Backbone.View.extend(
{
  tag:"div",
  className:"backgrounds-view",
  template: JST['templates/card/backgroundsview'],

  initialize:function()
  {
    _.bindAll(this, 'render', 'addBackgroundView');
  },

  render:function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addBackgroundView);

    // show the first image if none is active
    if(this.options.image_id == null)
      this.$('.carousel-inner').find('.item').first().addClass("active");

    return this;
  },

  addBackgroundView:function(backgroundModel)
  {
    var backgroundView = new App.BackgroundView({model:backgroundModel});
    backgroundView.$el.appendTo(this.$('.carousel-inner'))

    if(backgroundModel.id == this.options.image_id)
       backgroundView.$el.addClass("item active");

    backgroundView.render();
  }
});

/////////////////////////////
// ArtWork Images
/////////////////////////////

App.ArtWorksCollection = Backbone.Collection.extend(
{
  model: Backbone.Model
});

App.ArtWorkView = Backbone.View.extend(
{
  tag: "div",
  className: "item",
  template: JST['templates/card/artworkview'],

  initialize:function()
  {
    _.bindAll(this, 'render', 'remove');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

App.ArtWorksView = Backbone.View.extend(
{
  tag:"div",
  className:"artworks-view",
  template: JST['templates/card/artworksview'],

  initialize:function()
  {
    _.bindAll(this, 'render', 'addArtWorkView');
  },

  render:function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addArtWorkView);

    // show the first image if none is active
    if(this.options.image_id == null)
      this.$('.carousel-inner').find('.item').first().addClass("active");

    return this;
  },

  addArtWorkView:function(artWorkModel)
  {
    var artWorkView = new App.ArtWorkView({model:artWorkModel});
    artWorkView.$el.appendTo(this.$('.carousel-inner'))

    if(artWorkModel.id == this.options.image_id)
       artWorkView.$el.addClass("item active");

    artWorkView.render();
  }
});

/////////////////////////////
// Card Carousel
/////////////////////////////

App.CardCarouselCollection = Backbone.Collection.extend(
{
  model: Backbone.Model
});

App.CardCarouselView = Backbone.View.extend(
{
  tag: "div",
  className: "item",

  initialize: function()
  {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.template = JST['templates/styles/' + this.model.attributes.style.template_name];
    this.$el.html(this.template(this.model.attributes));
    this.$el.find(".card-view-base").addClass("card-view-shadow center");
    this.$el.append(JST['templates/card/cardcarouselvieweditbutton'](this.model.attributes));

    return this;
  }
});

App.CardCarouselsView = Backbone.View.extend(
{
  tag: "div",
  className:"card-carousels-view",
  template: JST['templates/card/cardcarouselsview'],

  initialize: function()
  {
    _.bindAll(this, 'render', 'addCarouselView');
  },

  render: function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addCarouselView);
    return this;
  },

  addCarouselView: function(model)
  {
    var modelView = new App.CardCarouselView({model:model});
    modelView.$el.appendTo(this.$('.carousel-inner'));
    modelView.render();

    if( this.options.selectID == model.id )
    {
      modelView.$el.addClass('active');
      active='class="active"';
    }
    else
      active='';

    this.$(".carousel-indicators").append('<li data-target="#cards-carosel" data-slide-to="' +
                                           this.collection.indexOf(model) + '"' + active +'></li>');
  },
});

/////////////////////////////
// Card Edit View
/////////////////////////////

App.CardEditView = Backbone.View.extend(
{
  tag:"div",
  className:"card-edit-view",
  template: JST['templates/card/cardeditview'],
  events:
  {
    'click .artwork-view-btn': 'changeImage',
    'click .background-view-btn': 'changeBackgroundImage',
    'click .save-changes-btn': 'save',
    'click .edit-card-btn': 'changeModel'
  },

  initialize:function()
  {
    _.bindAll(this, 'render', 'save', 'changeImage', 'enableSave', 'disableSave',
              'updateCardDescription', 'updateCardName','updateBorderColor', 'updateBorderStyle',
              'updateBorderWidth', 'changeBackgroundImage', 'changeModel');

    this.listenTo(this.model, 'change', this.enableSave);
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    $("#name-input").bind('keyup cut paste', this.updateCardName);
    $("#description-input").bind('keyup cut paste', this.updateCardDescription);
    $("#border-style-select").bind('change', this.updateBorderStyle);
    $("#border-width-slider").bind('change', this.updateBorderWidth);
    $("#border-color-picker").bind('change', this.updateBorderColor);

    this.artworksCollection = new App.ArtWorksCollection(this.options.artworks);
    this.artworksView = new App.ArtWorksView({collection:this.artworksCollection,
                                                    image_id:this.model.get("image_id")})
    this.artworksView.$el.appendTo(this.$("#artworks-view-parent"));
    this.artworksView.render();

    //this.cardPreview = new App.CardPreviewView({model:this.model});
    //this.cardPreview.$el.appendTo(this.$("#card-preview-parent"));
    //this.cardPreview.render();

    this.borderColorView = new App.ColorPickerView({model:this.model, atrib:"border_color"});
    this.borderColorView.$el.appendTo(this.$("#border-color-picker"));
    this.borderColorView.render();

    this.backgroundsCollection = new App.BackgroundsCollection(this.options.backgrounds);
    this.backgroundsView = new App.BackgroundsView({collection:this.backgroundsCollection,
                                                    image_id:this.model.get("background_id")})
    this.backgroundsView.$el.appendTo(this.$("#backgrounds-view-parent"));
    this.backgroundsView.render();

    this.cardCarouselCollection = new App.CardCarouselCollection(this.options.cards);
    this.cardCarouselsView = new App.CardCarouselsView({collection:this.cardCarouselCollection, selectID:this.model.id});
    this.cardCarouselsView.$el.appendTo(this.$("#card-carousels-parent"));
    this.cardCarouselsView.render();

    return this;
  },

  changeModel:function(e)
  {
    var modelId = $(e.target).data("id");

    this.cardCarouselCollection.each(function(crd)
    {
      if(crd.id==modelId)
      {
        this.model=crd;
        this.render();
      }
    }.bind(this))
  },

  changeImage:function(e)
  {
      var imageId = $(e.target).data("id");

      if(imageId)
      {
        var bg = this.artworksCollection.get(imageId);
        this.model.set({image:{url:bg.get("url")}});
        this.model.set("image_id", imageId);
      }
  },

  changeBackgroundImage:function(e)
  {
      var imageId = $(e.target).data("id");

      if(imageId)
      {
        var bg = this.backgroundsCollection.get(imageId);
        this.model.set({background:{url:bg.get("url")}});
        this.model.set("background_id", imageId);
      }
  },

  updateCardDescription:function()
  {
    this.model.set("description", $("#description-input").val());
  },

  updateCardName:function()
  {
    this.model.set("name", $("#name-input").val());
  },

  updateBorderStyle:function()
  {
    this.model.set("border_style", $("#border-style-select").val());
  },

  updateBorderWidth:function()
  {
    this.model.set("border_width", $("#border-width-slider").val());
  },

  updateBorderColor:function()
  {
    this.model.set("border_color", $("#border-color-picker").val());
  },

  save:function(e)
  {
    this.disableSave();
    this.model.save();
  },

  enableSave:function()
  {
    $(".save-changes-btn").removeClass("disabled");
  },

  disableSave:function()
  {
    $(".save-changes-btn").addClass("disabled");
  }
});

function addCardEditView(container, json, bkgds, artworks, cards)
{
  window.cardModel = new App.CardModel(json);
  window.cardEditView = new App.CardEditView({model: cardModel, backgrounds: bkgds,
                            artworks: artworks, cards: cards});
  window.cardEditView.$el.appendTo(container);
  window.cardEditView.render();
}
