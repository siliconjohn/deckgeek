class Game < ActiveRecord::Base
  belongs_to :user, :inverse_of => :games
  has_many :decks, :inverse_of => :game, :dependent => :destroy

  attr_accessible :description, :name, :user_id

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255
end
