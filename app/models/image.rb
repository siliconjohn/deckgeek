class Image < ActiveRecord::Base
  has_many :cards;
  attr_accessible :name, :url
  validates_length_of :name, :maximum => 255
end
