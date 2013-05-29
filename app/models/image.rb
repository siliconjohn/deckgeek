class Image < ActiveRecord::Base
  attr_accessible :name, :url
  validates_length_of :name, :maximum => 255
end
