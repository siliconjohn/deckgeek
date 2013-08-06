/******************************************
 * Images View - shows a list of images in  
 * a jscroller
 ******************************************/

App.ImageView = Backbone.View.extend(
{
  tagName: "li",
  template: _.template("<img alt='<%= url %>' src='/assets/backgrounds/<%= url %>'/>"), 
 
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
  template: _.template("<ul class='jscroller-ul'></ul>"), 
 
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
 * Add to container
 ******************************************/

function addImagesView( container, json, options )
{
  imagesView = new App.ImagesView({ collection: new Backbone.Collection( json ),
                                    options: options });
  imagesView.$el.appendTo( container );
  imagesView.render();
}

// App.ImagesCollection = Backbone.Collection.extend(
// {
//   model: Backbone.Model
// });
