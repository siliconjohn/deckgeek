class HomeController < ApplicationController
	
	protect_from_forgery :except => :receive_guest
	respond_to :html;

  def index
    if get_current_or_guest_user
   
      if get_current_or_guest_user.admin
       @game = Game.where( get_current_or_guest_user.id )
      else
       @game = Game.where( get_current_or_guest_user.id, :conditions => { :user_id => get_current_or_guest_user.id })
      end
   
      render "home"
    else
    	render "index" 
    end
  end

  def guest
  	if get_current_user_or_create_guest_user
      
       @game = Game.where( get_current_or_guest_user.id, :conditions => { :user_id => get_current_or_guest_user.id })
       render "home"
    else
    	render "index"  
    end
  end
end
