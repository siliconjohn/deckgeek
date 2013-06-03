
App.Image=Backbone.Model.extend({
});

App.ImageView=Backbone.View.extend({
  tag:"div",
  className:"item",
  template: JST['templates/images/imageview'],

  initialize:function(){
    _.bindAll(this,'render', 'remove');
    this.listenTo(this.model,'change',this.render);
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

App.Images=Backbone.Collection.extend({
  model: App.Image,
  url: "/images.json"
});

App.ImagesView=Backbone.View.extend({
  tag:"div",
  className:"collapse in",
  id:"image-style-carosel-parent",
  template: JST['templates/images/imagesview'],

  initialize:function(){
    _.bindAll(this,'addImage', 'render');
    this.listenTo(this.collection, 'add', this.addImage);
  },

  render:function(){
    this.$el.html(this.template());
    this.collection.each(this.addImage);
  },

  addImage:function(imageModel){
    var imageView=new App.ImageView({model:imageModel});
    imageView.$el.appendTo(this.$('.carousel-inner'))

    if(imageModel.id==this.options.image_id)
       imageView.$el.addClass("item active");

    imageView.render();
  }
});
