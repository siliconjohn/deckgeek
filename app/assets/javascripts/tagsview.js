/******************************************
 * Tags View - shows a list of tags in a 
 * jscroller
 ******************************************/

App.TagView = Backbone.View.extend(
{
  tagName: "li",
  className: "tag",
  template: _.template("<%= title %>"), 
  events:
  {
    'becameSelected': 'becameSelected',
    'becameDeSelected': 'becameDeSelected' 
  },

  initialize:function()
  {
    _.bindAll(this, 'render', 'becameSelected', 'becameDeSelected');
    this.listenTo(this.model, 'change', this.render); 
  },

  render:function()
  {
    this.$el.html(this.template(this.model.attributes));
    this.$el.makeSelectable( this.options.options );
    return this;
  },

  becameSelected:function()
  {
    var event = jQuery.Event("addImageIds");
    event.images = this.model.attributes.images; 
    this.$el.trigger( event );;
  },

  becameDeSelected:function()
  {
    var event = jQuery.Event("removeImageIds");
    event.images = this.model.attributes.images; 
    this.$el.trigger( event );
  }
});

App.TagsView = Backbone.View.extend(
{
  firstTagView: false,
  className: "jscroller tags-view",
  template: _.template("<ul class='jscroller-ul'></ul>"), 
 
  initialize:function()
  {
    _.bindAll(this, 'render', 'addTagView' );
  },

  render:function()
  {
    this.$el.html(this.template());
    this.collection.each(this.addTagView);
    
    if(this.firstTagView!=false)
    {
      this.firstTagView.addClass( 'jselected' ); 
      this.firstTagView.trigger( 'becameSelected' );
      this.firstTagView = false;
    }

    return this;
  },

  addTagView:function(model)
  {
    var tagView = new App.TagView({ model:model, options:this.options.options });
    tagView.$el.appendTo(this.$el.find(".jscroller-ul"));
    tagView.render();
    if(this.firstTagView==false)this.firstTagView=tagView.$el;
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
