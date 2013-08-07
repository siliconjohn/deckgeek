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
  imageViews:[],
  className: "jscroller images-view",
  template: _.template("<ul class='jscroller-ul'></ul>"), 
 
  initialize:function()
  {
    _.bindAll(this, 'render', 'addImageView', 'addImageIds', 'removeImageIds');
    $("body").delegate( ".tag", "addImageIds", this.addImageIds);
    $("body").delegate( ".tag", "removeImageIds", this.removeImageIds);
  },

  render:function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addImageView);
    return this;
  },
  
  addImageIds:function(e)
  {
    $.each(e.images, function(index, value)
    {
      this.imageViews[value.id].$el.show(400);
    }.bind(this));
  },

  removeImageIds: function (e)
  {
    $.each(e.images, function(index, value)
    {
      this.imageViews[value.id].$el.hide(400);
    }.bind(this));
  },

  addImageView:function(model)
  {
    var imageView = new App.ImageView({ model:model, options:this.options.options });
    imageView.$el.appendTo(this.$el.find(".jscroller-ul"));
    imageView.render();
    this.imageViews[model.id]=imageView;
    imageView.$el.hide();
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
