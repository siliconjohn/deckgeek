class Feedback < ActiveRecord::Base
  belongs_to :user, :inverse_of => :feedbacks
  
  attr_accessible :subject, :body, :user_id

  validates_length_of :subject, :maximum => 128
  validates_length_of :body, :maximum => 512
end
