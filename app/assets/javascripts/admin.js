
/******************************************
 * Users Model
 ******************************************/

App.AdminUserModel = Backbone.Model.extend(
{

});

/******************************************
 * Users Collection
 ******************************************/

App.AdminUserCollection = Backbone.Collection.extend(
{
	model: App.AdminUserModel
});

/******************************************
 * User View
 ******************************************/

App.AdminUserView = Backbone.View.extend(
{
	tagName: "tr",
	template: JST[ 'templates/admin/usertablerow'],

	initialize: function()
	{
		_.bindAll(this, 'render' );
	},

	render: function()
	{
		this.$el.html( this.template( this.model.attributes ));
		return this;
	}
});

/******************************************
 * Users View
 ******************************************/

App.AdminUsersView = Backbone.View.extend(
{
	tagName: "table",
	className: "table table-striped",
	template: JST[ 'templates/admin/usertable' ],

	initialize:function()
	{
		_.bindAll( this, 'render', 'addUserView' );
	},

	render:function()
	{
		this.$el.html( this.template());
		this.collection.each( this.addUserView );
		return this;
	},

	addUserView:function(model)
	{
		var usr = new App.AdminUserView({ model:model });
		usr.$el.appendTo( this.$el );
		usr.render();
	}
});
 
/******************************************
 * Add to an container element
 ******************************************/

function addUsersViewJson(container, json)
{
	window.App.views.usersView = new App.AdminUsersView({ collection: new App.AdminUserCollection(json) });
  window.App.views.usersView.$el.appendTo(container);
	window.App.views.usersView.render();
}