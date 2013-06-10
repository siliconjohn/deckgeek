/******************************************
 * This is for displaying one card
 * and all of the UI needed to edit it.
 ******************************************/

/////////////////////////////
// Card Model              //
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
// Card Preview View       //
/////////////////////////////

App.CardPreviewView=Backbone.View.extend(
{
  tag:"div",
  id:"card-preview-view",

  initialize:function(){
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function(){
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
// Background Image        //
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
// ArtWork Images          //
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

  addArtWorkView:function(ArtWorkModel)
  {
    var ArtWorkView = new App.ArtWorkView({model:ArtWorkModel});
    ArtWorkView.$el.appendTo(this.$('.carousel-inner'))

    if(ArtWorkModel.id == this.options.image_id)
       ArtWorkView.$el.addClass("item active");

    ArtWorkView.render();
  }
});

/////////////////////////////
// Card Edit View          //
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
    'click #next-card-btn': 'nextCard',
    'click #prev-card-btn': 'prevCard'
  },

  initialize:function()
  {
    _.bindAll(this, 'render', 'save', 'changeImage', 'enableSave', 'disableSave',
              'nextCard', 'prevCard', 'updateCardDescription', 'updateCardName',
              'updateBorderColor', 'updateBorderStyle', 'updateBorderWidth',
              'changeBackgroundImage');

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

    if(this.options.nextCard == -1)
      $("#next-card-btn").addClass('disabled')
    else
      $("#next-card-btn").removeClass("disabled");

    if(this.options.prevCard == -1)
      $("#prev-card-btn").addClass('disabled')
    else
      $("#prev-card-btn").removeClass("disabled");

    this.artworksCollection = new App.ArtWorksCollection(this.options.artworks);
    this.artworksView = new App.ArtWorksView({collection:this.artworksCollection,
                                                    image_id:this.model.get("image_id")})
    this.artworksView.$el.appendTo(this.$("#artworks-view-parent"));
    this.artworksView.render();

    this.cardPreview = new App.CardPreviewView({model:this.model});
    this.cardPreview.$el.appendTo(this.$("#card-preview-parent"));
    this.cardPreview.render();

    this.borderColorView = new App.ColorPickerView({model:this.model, atrib:"border_color"});
    this.borderColorView.$el.appendTo(this.$("#border-color-picker"));
    this.borderColorView.render();

    this.backgroundsCollection = new App.BackgroundsCollection(this.options.backgrounds);
    this.backgroundsView = new App.BackgroundsView({collection:this.backgroundsCollection,
                                                    image_id:this.model.get("background_id")})
    this.backgroundsView.$el.appendTo(this.$("#backgrounds-view-parent"));
    this.backgroundsView.render();

    return this;
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

  nextCard:function()
  {
     if(this.options.nextCard != -1)
       window.location=this.options.nextCard;
  },

  prevCard:function()
  {
    if(this.options.prevCard != -1)
      window.location = this.options.prevCard;
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

function addCardEditView(container, json, next, prev, bkgds, artworks)
{
  window.cardModel = new App.CardModel(json);
  window.cardEditView = new App.CardEditView({model: cardModel, nextCard:next,
                                              prevCard:prev, backgrounds:bkgds, artworks:artworks});
  window.cardEditView.$el.appendTo(container);
  window.cardEditView.render();
}
