class AdminController < ApplicationController
  
  before_filter :require_admin_login
	respond_to :html;

	def index
		@users =  User.all.sort_by &:created_at
		@users.reverse!
  end

  def show
  	@user = User.find( params[ :id ]);
  end
end
