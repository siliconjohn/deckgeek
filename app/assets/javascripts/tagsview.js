/******************************************
 * Tags View - shows a list of tags in a 
 * jscroller
 ******************************************/

App.TagView = Backbone.View.extend(
{
  tagName: "li",
  className: "tag",
  template: _.template("<%= title %>"), 

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

App.TagsView = Backbone.View.extend(
{
  className: "jscroller tags-view",
  template: _.template("<ul class='jscroller-ul'></ul>"), 

  initialize:function()
  {
    _.bindAll(this, 'render', 'addTagView');
  },

  render:function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addTagView);
    return this;
  },

  addTagView:function(TagModel)
  {
    var TagView = new App.TagView({ model:TagModel, options:this.options.options });
    TagView.$el.appendTo(this.$el.find(".jscroller-ul"));
    TagView.render();
  }
});

/*****************************************
 * Add to container
 ******************************************/

function addTagsView( container, json, options )
{
  tagsView = new App.TagsView({ collection: new Backbone.Collection( json ),
                                options: options });
  tagsView.$el.appendTo( container );
  tagsView.render();
}

// App.TagsCollection = Backbone.Collection.extend(
// {
//   model: Backbone.Model
// });

