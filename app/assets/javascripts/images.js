
App.Image=Backbone.Model.extend({
});

App.ImageView=Backbone.View.extend({
  tag:"div",
  className:"item",
  template: JST['templates/images/imageview'],
  events: {
    "click .image-style-btn": "click"
  },

  initialize:function(){
    _.bindAll(this,'render', 'remove', 'click');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
  },

  click:function(){
    window.cardEditView.setImage(this.model.id);
  }
});

App.Images=Backbone.Collection.extend({
  model:App.Image,
  url: "/images.json"
});

App.ImagesView=Backbone.View.extend({
  tag:"div",
  className:"collapse in",
  id:"image-style-carosel-parent",
  template: JST['templates/images/imagesview'],

  initialize:function(){
    _.bindAll(this,'addImage','render');
    this.listenTo(this.collection, 'add', this.addImage);
  },

  render: function(){
    this.$el.html(this.template());
    this.collection.each(this.addImage);
  },

  addImage: function(imageModel){
    var imageView=new App.ImageView({model:imageModel});
    imageView.$el.appendTo(this.$('.carousel-inner'))

    if(imageModel.id==window.App.data.card_image_id)
      imageView.$el.addClass("item active");

    imageView.render();
  }
});

function getImages(container,json){
  window.images = new App.Images();
  window.imagesView = new App.ImagesView({collection: images});
  window.imagesView.$el.appendTo(container);
  window.images.reset(json);
  window.imagesView.render();
}
