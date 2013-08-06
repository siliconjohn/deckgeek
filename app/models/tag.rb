class Tag < ActiveRecord::Base
 
  attr_accessible :title
  validates_length_of :title, :maximum => 24 

  has_many :image_tags
  has_many :images, :through => :image_tags

  def as_json(a)
    super( :only => [ :title, :id ],  :include => {:images  => { :only => [ :id] }})
  end
  
end
