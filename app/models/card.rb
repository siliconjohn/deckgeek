class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  has_one :theme;
  attr_accessible :description, :name, :deck_id, :theme_id
end
