class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  belongs_to :style, :inverse_of => :cards
  belongs_to :background, :inverse_of => :cards

  attr_accessible :description, :name, :deck_id, :style_id, :border_width,
     :border_style, :border_color, :border_radius, :background_id

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255

  def as_json(a)
    super( :include => [:style, :background ])
  end

end



