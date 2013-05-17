class Game < ActiveRecord::Base
  belongs_to :user, :inverse_of => :games
  attr_accessible :description, :name, :user_id
  has_many :decks, :inverse_of => :game, :dependent => :destroy
end
