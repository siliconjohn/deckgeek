class Style < ActiveRecord::Base
  has_many :cards;

  attr_accessible :description, :name, :template_name

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255
end
