class GamesController < ApplicationController

  before_filter :require_login
  protect_from_forgery :except => :receive_guest

  # GET /games(.:format)
  def index
    @games = Game.where( :user_id => get_current_or_guest_user.id )

    if @games.any?
      render json: @games
    else
      render_json_200
    end
  end

  # GET /games/:id(.:format)
  def show
    begin
      if get_current_or_guest_user.admin
       @game = Game.find( params[:id])
     else
       @game = Game.find( params[:id], :conditions => { :user_id => get_current_or_guest_user.id })
      end
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      @decks = Deck.where( :game_id => params[:id] )

      respond_to do |format|
        format.html
        format.json { render json: @game }
      end
    end
  end

  # PUT /games/:id(.:format)
  def update
    begin
       @game = Game.find( params[:id] )
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      if @game.update_attributes( params[:game] )
        render json:@game, status: :ok
      else
        render json: @game.errors, status: :unprocessable_entity
      end
    end
  end

  # POST /games(.:format)
  def create
    @game = Game.new( params[:game] )
    @game.user_id = get_current_or_guest_user.id;

    if @game.save
      add_example_deck_to_user( @game )

      render json: @game, status: :created, location: @games
    else
      format.json { render json: @game.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /games/:id(.:format)
  def destroy
    begin
       @game = Game.find( params[:id], :conditions => { :user_id => get_current_or_guest_user.id })
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      @game.destroy
      render_json_200
    end
  end

end
