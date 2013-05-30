class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  belongs_to :style, :inverse_of => :cards
  belongs_to :image, :inverse_of => :cards

  attr_accessible :description, :name, :deck_id, :style_id, :image_id

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255
end
