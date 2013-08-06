class TagsController < ApplicationController
  
  protect_from_forgery :except => :receive_guest
  before_filter :require_login
  respond_to :json;

  # GET /tags(.:format) tags#index
  def index
    @tags = Tag.all;

    if @tags.any?
      render :json => @tags
    else
      render_json_200
    end
  end
end
