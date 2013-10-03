class FeedbacksController < ApplicationController

  def index
    unless current_user.try(:admin?)
      render_404  
      return
    end

    @feedbacks =Feedback.all
    
    render "index"   
  end

  def create
    unless get_current_or_guest_user
      render_404  
      return
    end

    @feedback = Feedback.new( params[:feedback] )
    @feedback.user_id = get_current_or_guest_user.id;
    @feedback.save 
  end
end
