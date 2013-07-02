class ImagesController < ApplicationController

  before_filter :require_login
  respond_to :json;

  # GET /images(.:format) images#index
  def index
    @images = Image.all;

    if @images.any?
     render :json => @images
    else
      render_json_200
    end
  end
end
