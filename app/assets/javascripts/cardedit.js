
App.CardEditModel=Backbone.Model.extend({
  url:function(){
        return window.App.data.card_id;
      }
});

App.CardEditView=Backbone.View.extend({
  tag:"div",
  className:"card-edit",
  template: JST['templates/cards/cardedit'],
  events: {
    'click .use-image-btn': 'changeImage',
    'click .save-changes-btn': 'save'
  },

  initialize:function(){
    _.bindAll(this,'render','save','changeImage','enableSave','disableSave');
  },

  selectCardsImage:function(r)
  {
    this.imagesView.selectImageWithID(this.model.get("image_id"));
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    $("#name-input").bind('keyup cut paste',this.enableSave);
    $("#description-input").bind('keyup cut paste',this.enableSave);

    this.images = new App.Images();
    this.images.fetch();
    this.imagesView = new App.ImagesView({collection:this.images,image_id:this.model.get("image_id")});
    this.imagesView.$el.appendTo(this.$el.find(".images-holder"));
    this.imagesView.render();

    return this;
  },

  save:function(){
    this.model.set("name",$("#name-input").val());
    this.model.set("description",$("#description-input").val());
    this.model.save();
    this.disableSave();
  },

  changeImage:function(e){
      var imageId=$(e.target).data("id");

      if(imageId){
        this.model.set("image_id",imageId);
        this.enableSave();
      }
  },

  enableSave:function(){
    $(".save-changes-btn").addClass("btn-success").removeClass("disabled");
  },

  disableSave:function(){
    $(".save-changes-btn").addClass("disabled").removeClass("btn-success");
  }
});

function getCardEdit(container,json){
  window.cardEditModel = new App.CardEditModel();
  window.cardEditView = new App.CardEditView({model: cardEditModel});
  window.cardEditView.$el.appendTo(container);
  window.cardEditModel.set(json);
  window.cardEditView.render();
}
