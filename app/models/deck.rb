class Deck < ActiveRecord::Base
  belongs_to :game, :inverse_of => :decks
  has_many :cards, :inverse_of => :deck, :dependent => :destroy

  attr_accessible :description, :name, :game_id

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255

  def as_json(a)
    super( :include => :cards );
  end
end
