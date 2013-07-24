class PrintController < ApplicationController

	before_filter :require_login
	respond_to :html;

  def show
  	
  	begin
  		@games = Game.find( params[ :id ], :conditions => { :user_id => get_current_or_guest_user.id });
  	rescue ActiveRecord::RecordNotFound => e
      render_404
    end

    @decks = Deck.where( :game_id => params[:id] )
  end
  
end
