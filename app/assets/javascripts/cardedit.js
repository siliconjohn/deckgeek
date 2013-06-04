/////////////////////////////
// Card Model              //
/////////////////////////////

App.CardModel=Backbone.Model.extend(
{
  url:function()
  {
    return this.get("id");
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
    _.bindAll(this,'render');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.template = JST['templates/styles/'+this.model.attributes.style.template_name];
    this.$el.html(this.template(this.model.attributes));
    this.$el.find(".card-view-base").addClass('card-view-shadow center');
  }
});

/////////////////////////////
// Card Edit View          //
/////////////////////////////

App.CardEditView=Backbone.View.extend(
{
  tag:"div",
  className:"card-edit-view",
  template: JST['templates/cards/cardedit'],
  events: {
    'click .use-image-btn': 'changeImage',
    'click .save-changes-btn': 'save',
    'click #next-card-btn': 'nextCard',
    'click #prev-card-btn': 'prevCard'
  },

  initialize:function()
  {
    _.bindAll(this,'render','save','changeImage','enableSave','disableSave',
              'nextCard', 'prevCard','updateCardDescription','updateCardName');
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    $("#name-input").bind('keyup cut paste',this.enableSave);
    $("#name-input").bind('keyup cut paste',this.updateCardName);
    $("#description-input").bind('keyup cut paste',this.enableSave);
    $("#description-input").bind('keyup cut paste',this.updateCardDescription);

    if(this.options.nextCard==-1)
      $("#next-card-btn").addClass('disabled')
    else
      $("#next-card-btn").removeClass("disabled");

    if(this.options.prevCard==-1)
      $("#prev-card-btn").addClass('disabled')
    else
      $("#prev-card-btn").removeClass("disabled");

    this.images = new App.Images();
    this.images.fetch();
    this.imagesView = new App.ImagesView({collection:this.images,image_id:this.model.get("image_id")});
    this.imagesView.$el.appendTo(this.$el.find(".images-holder"));
    this.imagesView.render();

    this.cardPreview = new App.CardPreviewView({model:this.model});
    this.cardPreview.$el.appendTo(this.$el.find("#card-preview-parent"));
    this.cardPreview.render();

    return this;
  },

  changeImage:function(e)
  {
      var imageId=$(e.target).data("id");

      if(imageId){
        this.model.set("image_id",imageId);
        this.enableSave();
      }
  },

  selectCardsImage:function(r)
  {
    this.imagesView.selectImageWithID(this.model.get("image_id"));
  },

  updateCardDescription:function()
  {
    this.model.set("description",$("#description-input").val());
  },

  updateCardName:function()
  {
    this.model.set("name",$("#name-input").val());
  },

  save:function()
  {
    this.model.save();
    this.disableSave();
  },

  nextCard:function()
  {
    if(this.options.nextCard!=-1)
      window.location=this.options.nextCard;
  },

  prevCard:function()
  {
    if(this.options.prevCard!=-1)
      window.location=this.options.prevCard;
  },

  enableSave:function()
  {
    $(".save-changes-btn").addClass("btn-success").removeClass("disabled");
  },

  disableSave:function()
  {
    $(".save-changes-btn").addClass("disabled").removeClass("btn-success");
  }
});

function getCardEdit(container,json,next,prev)
{
  window.cardModel = new App.CardModel(json);
  window.cardEditView = new App.CardEditView({model: cardModel, nextCard:next, prevCard:prev});
  window.cardEditView.$el.appendTo(container);
  window.cardEditView.render();
}
