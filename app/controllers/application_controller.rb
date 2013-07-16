class ApplicationController < ActionController::Base
  #protect_from_forgery

  def require_login
    unless current_or_guest_user
      redirect_to "/users/sign_in"
    end
  end

  def require_admin_login
    unless current_user.try(:admin?)
      render_404
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

  ########################################
  # Guest user/user stuff
  ########################################

  helper_method :current_or_guest_user

  def current_or_guest_user
    if current_user
      if session[:guest_user_id]
        logging_in
        guest_user.destroy
        session[:guest_user_id] = nil
      end
      current_user
    else
      guest_user
    end
  end

  # find guest_user object associated with the current session,
  # creating one as needed
  def guest_user
    # Cache the value the first time it's gotten.
    @cached_guest_user ||= User.find(session[:guest_user_id] ||= create_guest_user.id)

  rescue ActiveRecord::RecordNotFound # if session[:guest_user_id] invalid
     session[:guest_user_id] = nil
     guest_user
  end

  private

  # called (once) when the user logs in, insert any code your application needs
  # to hand off from guest_user to current_user.
  def logging_in
    # if request.env['HTTP_REFERER'].match(new_user_session_path)
    #   log "qqqq"
    # else
    #   log "eeee"
    #  end 
   # users/sign_up
    #http://localhost:3000/users/sign_up

    # For example:
    # guest_comments = guest_user.comments.all
    # guest_comments.each do |comment|
      # comment.user_id = current_user.id
      # comment.save!
    # end
  end

  def create_guest_user
    u = User.create(:email => "guest_#{Time.now.to_i}#{rand(99)}@guest.com")
    u.save!(:validate => false)
    session[:guest_user_id] = u.id
    u
  end

  #def add_no_cache_header
    # response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    # response.headers["Pragma"] = "no-cache"
    # response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  #end
end
