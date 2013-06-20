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


App.CardCollection = Backbone.Collection.extend(
{
  model: App.CardModel
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
    this.template = JST['templates/styles/' + this.model.attributes.style.template_name]

    this.$el.html(this.template(this.model.attributes,{model: this.model}));
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
              'updateCardDescription', 'updateCardName','updateBorderColor',
              'updateBorderWidth', 'changeBackgroundImage', 'changeModel',
              'updateBorderVisible', 'updateBorderOutline', 'updateBorderInline',
              'updateTitleWidth', 'updateTitleAlignment');
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    $("#name-input").bind('keyup cut paste', this.updateCardName);
    $("#description-input").bind('keyup cut paste', this.updateCardDescription);
    $("#border-width-slider").bind('change', this.updateBorderWidth);
    $("#border-color-picker").bind('change', this.updateBorderColor);
    $("#border-toggle-btn").bind('click', this.updateBorderVisible);
    $("#outline-toggle-btn").bind('click', this.updateBorderOutline);
    $("#inline-toggle-btn").bind('click', this.updateBorderInline);
    $("#title-width-slider").bind('change', this.updateTitleWidth);
    $("#title-align-left-btn").bind('click', this.updateTitleAlignment);
    $("#title-align-center-btn").bind('click', this.updateTitleAlignment);
    $("#title-align-right-btn").bind('click', this.updateTitleAlignment);

    //this.artworksCollection = new App.ArtWorksCollection(this.options.artworks);
    //this.artworksView = new App.ArtWorksView({collection:this.artworksCollection,
    //                                            image_id:this.model.get("image_id")})
    //this.artworksView.$el.appendTo(this.$("#artworks-view-parent"));
    //this.artworksView.render();

    this.backgroundsCollection = new App.BackgroundsCollection(this.options.backgrounds);
    this.backgroundsView = new App.BackgroundsView({collection:this.backgroundsCollection,
                                                    image_id:this.model.get("background_id")})
    this.backgroundsView.$el.appendTo(this.$("#backgrounds-view-parent"));
    this.backgroundsView.render();

    this.cardCarouselsView = new App.CardCarouselsView({collection:window.App.data.cardModels, selectID:this.model.id});
    this.cardCarouselsView.$el.appendTo(this.$("#card-carousels-parent"));
    this.cardCarouselsView.render();

    this.listenTo(this.model, 'change', this.enableSave);

    return this;
  },

  changeModel:function(e)
  {
    var modelId = $(e.target).data("id");

    window.App.data.cardModels.each(function(crd)
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

  updateTitleWidth: function()
  {
    this.model.set("title_width", $("#title-width-slider").val());
  },

  updateTitleAlignment: function(el)
  {
    if(el.target.id=="title-align-left-btn") { this.model.set("title_alignment","left")} else
      if(el.target.id=="title-align-center-btn") {this.model.set("title_alignment","center")} else
        if(el.target.id=="title-align-right-btn") {this.model.set("title_alignment","right");}
  },

  updateCardDescription:function()
  {
    this.model.set("description", $("#description-input").val());
  },

  updateCardName:function()
  {
    this.model.set("name", $("#name-input").val());
  },

  updateBorderWidth:function()
  {
    this.model.set("border_width", $("#border-width-slider").val());

    var enabled=$("#border-toggle-btn").hasClass("active");
    if ( !enabled )
    {
      this.updateBorderVisible();
      $("#border-toggle-btn").addClass("active");
    }
  },

  updateBorderColor:function()
  {
    var enabled=$("#border-toggle-btn").hasClass("active");
    if ( !enabled )
    {
      this.updateBorderVisible();
      $("#border-toggle-btn").addClass("active");
    }

    this.model.set("border_color",$("#border-color-picker").spectrum("get").toRgbString());
  },

  updateBorderVisible:function()
  {
    var enabled=!$("#border-toggle-btn").hasClass("active");

    this.model.set("border_visible",enabled);

    if( enabled )
    {
      $("#outline-toggle-btn").removeClass('disabled');
      $("#inline-toggle-btn").removeClass('disabled');
    }
    else
    {
      $("#outline-toggle-btn").addClass('disabled');
      $("#inline-toggle-btn").addClass('disabled');
    }
  },

  updateBorderOutline:function()
  {
    this.model.set("border_outline",!$("#outline-toggle-btn").hasClass("active"));
  },

  updateBorderInline:function()
  {
    this.model.set("border_inline",!$("#inline-toggle-btn").hasClass("active"));
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

function addCardEditView(container, id, bkgds, artworks, cards)
{
  window.App.data.cardModels = new App.CardCollection(cards);
  window.App.views.cardEditView = new App.CardEditView({model:window.App.data.cardModels.findWhere({id: id}),
                                                        backgrounds: bkgds,
                                                        artworks: artworks,
                                                        cards: window.App.data.cardModels});
  window.App.views.cardEditView.$el.appendTo(container);
  window.App.views.cardEditView.render();
}
