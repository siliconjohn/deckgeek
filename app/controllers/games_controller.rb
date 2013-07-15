class GamesController < ApplicationController

  before_filter :require_login

  # GET /games(.:format)
  def index
    @games = Game.where( :user_id => current_user.id )

    if @games.any?
      render json: @games
    else
      render_json_200
    end
  end

  # GET /games/:id(.:format)
  def show
    begin
      if current_user.admin
       @game = Game.find( params[:id])
     else
       @game = Game.find( params[:id], :conditions => { :user_id => current_user.id })
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
    @game.user_id = current_user.id;

    if @game.save
      deck = Deck.new({ game_id: @game.id })
      deck.save
      card = Card.new({ deck_id: deck.id })
      card.save
      card = Card.new({ deck_id: deck.id })
      card.save
      card.update_attributes(getBlankCardAttributes)
      
      render json: @game, status: :created, location: @games
    else
      format.json { render json: @game.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /games/:id(.:format)
  def destroy
    begin
       @game = Game.find( params[:id], :conditions => { :user_id => current_user.id })
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      @game.destroy
      render_json_200
    end
  end

  def getBlankCardAttributes
    { background_visible: "false", name: "Blank Card", 
      title_bg_color: "rgba(9, 10, 12, 0.2)", description_bg_color: "rgba(9, 10, 12, 0.2)" }
  end    
end
