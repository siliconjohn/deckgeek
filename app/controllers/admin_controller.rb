class AdminController < ApplicationController
  
  before_filter :require_login
	respond_to :html;

	def index
   render "index"

  end
end
