class Style < ActiveRecord::Base
  has_many :cards;
  belongs_to :image, :inverse_of => :styles
  belongs_to :background, :inverse_of => :styles

  attr_accessible :description, :name, :template_name, :image_id, :background_id,
                  :border_width, :border_style, :border_color, :border_radius

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255
end
