class Image < ActiveRecord::Base

  attr_accessible :name, :url
  validates_length_of :name, :maximum => 255

  has_many :image_tags
  has_many :tags, :through => :image_tags

  def as_json(a)
    super( :only => [ :url, :name, :id ],  
           :include => { :tags  => { :only => [ :id ]}}) #:title ,
  end

end
