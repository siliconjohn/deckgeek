class StylesController < ApplicationController

  before_filter :require_login
  after_filter :add_no_cache_header
  respond_to :json;

  # GET /styles(.:format) styles#index
  def index
    @styles = Style.all;

    if @styles.any?
     render :json => @styles
    else
      render_json_200
    end
  end

end
