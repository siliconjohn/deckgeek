class Style < ActiveRecord::Base
  has_many :cards;
  belongs_to :image, :inverse_of => :styles

  attr_accessible :description, :name, :template_name, :image_id

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255
end
