class HomeController < ApplicationController
	
	protect_from_forgery :except => :receive_guest
	respond_to :html;

  def index
    if current_user
      render "home"
    else
    	render "index" # redirect_to new_user_session_path
    end
  end

  def guest
  	if current_or_guest_user
      render "home"
    else
    	render "index"  
    end
  end
end
