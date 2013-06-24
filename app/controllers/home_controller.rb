class HomeController < ApplicationController

  def index
    if current_user
      render "home"
    else
      #fix render :controller => "Devise::SessionsController", :action => "new"
    end
  end

end
