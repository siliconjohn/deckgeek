class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  belongs_to :game, :inverse_of => :cards
  belongs_to :style, :inverse_of => :cards
  belongs_to :background, :inverse_of => :cards

  attr_accessible :description, :name, :deck_id, :style_id,  :background_id,
                  :border_width, :border_visible, :border_color, :border_inline,
                  :border_outline, :background_visible, :background_color,

                  :title_width, :title_alignment, :title_top_margin,
                  :title_height, :title_border_outline, :title_visible, :title_bg_color,
                  :title_border_radius,

                  :description_width, :description_alignment, :description_bottom,
                  :description_height, :description_border_outline, :description_visible,
                  :description_bg_color, :description_border_radius,

                  :html

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255

  def as_json(a)
    super( :include => [:style, :background, { :deck => { :only => :game_id}} ])
  end

  # after_initialize :set_defaults
  # def set_defaults
  #   if self.new_record?
  #     logger.info self.description
  #     self.border_color="#ff0000" if self.border_color.blank? 
  #   end
  # end
end
