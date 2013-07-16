class BackgroundsController < ApplicationController

  protect_from_forgery :except => :receive_guest
  before_filter :require_login
  respond_to :json;

  # GET /backgrounds(.:format) backgrounds#index
  def index
    @backgrounds = Background.all;

    if @backgrounds.any?
      render :json => @backgrounds
    else
      render_json_200
    end
  end
end
