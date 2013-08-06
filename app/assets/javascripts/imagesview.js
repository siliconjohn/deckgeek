/******************************************
 * Images View
 ******************************************/

App.ImagesCollection = Backbone.Collection.extend(
{
  model: Backbone.Model
});

App.ImageView = Backbone.View.extend(
{
  tagName: "li",
  template: JST['templates/card/image'],

  initialize:function()
  {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    this.$el.makeSelectable( this.options.options );
    return this;
  }
});

App.ImagesView = Backbone.View.extend(
{
  className: "jscroller",
  template: JST['templates/card/images'],

  initialize:function()
  {
    _.bindAll(this, 'render', 'addImageView');
  },

  render:function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addImageView);
    return this;
  },

  addImageView:function(ImageModel)
  {
    var ImageView = new App.ImageView({ model:ImageModel, options:this.options.options });
    ImageView.$el.appendTo(this.$el.find(".jscroller-ul"));
    ImageView.render();
  }
});

/*****************************************
 * 
 ******************************************/

function addImagesView( container, json, options )
{
  images = new App.ImagesCollection( json );
  imagesView = new App.ImagesView( { collection: images, options: options });
  imagesView.$el.appendTo( container );
  imagesView.render();
}

