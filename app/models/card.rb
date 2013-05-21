class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  belongs_to :theme, :inverse_of => :cards
  attr_accessible :description, :name, :deck_id, :theme_id
end
