class Background < ActiveRecord::Base
  has_many :cards, :inverse_of => :background;
  has_many :styles, :inverse_of => :background;
  attr_accessible :name, :url
  validates_length_of :name, :maximum => 255
end
