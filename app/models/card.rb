class Card < ActiveRecord::Base
  belongs_to :deck, :inverse_of => :cards
  belongs_to :game, :inverse_of => :cards

  attr_accessible :name, :deck_id, :html
  
  validates_length_of :name, :maximum => 255

  def as_json(a)
    super( :include => [ { :deck => { :only => :game_id}} ])
  end
end
