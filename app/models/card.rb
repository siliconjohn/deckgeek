class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  belongs_to :style, :inverse_of => :cards
  belongs_to :background, :inverse_of => :cards

  attr_accessible :description, :name, :deck_id, :style_id,  :background_id,
                  :border_width, :border_visible, :border_color, :border_inline,
                  :border_outline,

                  :title_width, :title_alignment, :title_top_margin,
                  :title_height, :title_border_outline, :title_visible, :title_bg_color,
                  :title_border_radius,

                  :description_width, :description_alignment, :description_bottom,
                  :description_height, :description_border_outline, :description_visible,
                  :description_bg_color, :description_border_radius

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255

  def as_json(a)
    super( :include => [:style, :background ])
  end

end
