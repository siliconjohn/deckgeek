class Deck < ActiveRecord::Base
  belongs_to :game, :inverse_of => :decks
  attr_accessible :description, :name, :game_id
  has_many :cards, :inverse_of => :deck, :dependent => :destroy
end
