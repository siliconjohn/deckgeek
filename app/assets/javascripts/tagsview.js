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

    if(this.model.attributes.title=='All')
      event.images = 'All';
    else
      event.images = this.model.attributes.images; 
    
    this.$el.trigger( event );;
  },

  becameDeSelected:function()
  {
    var event = jQuery.Event("removeImageIds");
    
    if(this.model.attributes.title=='All')
      event.images = 'All';
    else
      event.images = this.model.attributes.images; 
    
    this.$el.trigger( event );
  }
});

App.TagsView = Backbone.View.extend(
{
  open:true,
  busy:false,
  firstTagView: false,
  className: "jscroller tags-view",
  template: _.template("<ul class='jscroller-ul'></ul>"), 
  events: {
    'click #show-hide-tags-btn' : 'toggle'
  },
 
  initialize:function()
  {
    _.bindAll(this, 'render', 'addTagView', 'toggle' );
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

    $('<div class="left-button"><a href="#" id="show-hide-tags-btn" class="btn btn-inverse btn-small"><i class="icon-white icon-chevron-down"></i></a></div>').prependTo(this.$el);

    return this;
  },

  addTagView:function(model)
  {
    var tagView = new App.TagView({ model:model, options:this.options.options });
    tagView.$el.appendTo(this.$el.find(".jscroller-ul"));
    tagView.render();
    if(this.firstTagView==false)this.firstTagView=tagView.$el;
  },

  toggle:function()
  {
    if(this.busy==true)return;
 
    if(this.open==true)
    {
      this.busy=true;
      this.open=false;

      $('#images-scroller').hide(400, 'swing', function(){
        this.busy=false;
        $('#show-hide-tags-btn i').removeClass('icon-chevron-down').addClass('icon-chevron-up');
      }.bind(this));
    }
    else
    {
      this.busy=true;
      this.open=true;
      
      $('#images-scroller').show(400, 'swing', function(){
        this.busy=false;
        $('#show-hide-tags-btn i').addClass('icon-chevron-down').removeClass('icon-chevron-up');
      ;
      }.bind(this));
    }
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
