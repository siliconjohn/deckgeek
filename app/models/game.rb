class Game < ActiveRecord::Base
  belongs_to :user, :inverse_of => :games
  has_many :decks, :inverse_of => :game, :dependent => :destroy
  has_many :cards, through: :decks

  attr_accessible :description, :name, :user_id

  validates_length_of :description, :maximum => 255
  validates_length_of :name, :maximum => 255

  def as_json(a)
    super( :include => [{:cards => {:include => [:style, :background]}}, :decks] )
  end

end
