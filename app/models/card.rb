class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  attr_accessible :description, :name, :deck_id
end
