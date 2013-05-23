class ApplicationController < ActionController::Base
  protect_from_forgery

  def require_login
    unless current_user
      redirect_to "/users/sign_in"
    end
  end

  def render_json_200
    render json:'[]', status: 200
  end

  def render_404
    respond_to do |format|
      format.html { render :file => "#{Rails.root}/public/404", :layout => false, :status => :not_found }
      format.xml  { head :not_found }
      format.json { render json:'[]', status: 404 }
      format.any  { head :not_found }
    end
  end

  def log(v)
    logger.info(v)
  end

  def add_no_cache_header
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end

end
