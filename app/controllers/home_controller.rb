class HomeController < ApplicationController

  def index
    if current_user
      render "home"
    else
      redirect_to new_user_session_path
    end
  end
end
