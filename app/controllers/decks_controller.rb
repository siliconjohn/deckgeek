class DecksController < ApplicationController

  respond_to :json
  before_filter :require_login

  # GET /games/:game_id/decks(.:format)
  def index
    @decks = Deck.where(:game_id => params[:game_id])

    if @decks.any?
      render json: @decks
    else
      render_json_200
    end
  end

  # /games/:game_id/decks/:id(.:format)
  def show
    @deck = Deck.where(:id => params[:id],:game_id => params[:game_id])

    if @deck.any?
      render json: @deck
    else
      render_json_200
    end
  end

  # PUT /games/:game_id/decks/:id(.:format)
  def update
    begin
      @deck = Deck.where(:id => params[:id],:game_id => params[:game_id])
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      if @deck.update_attributes(params[:deck])
        format.json { head :no_content }
      else
        format.json { render json: @deck.errors, status: :unprocessable_entity }
      end
    end
  end

  # POST /games(.:format)
  def create
    @deck = Deck.new(params[:deck])
    @deck.game_id = params[:game_id];

    if @deck.save
      format.json { render json: @deck, status: :created, location: @deck }
    else
      format.json { render json: @deck.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /games/:game_id/decks/:id(.:format)
  def destroy
    begin
       @deck = Deck.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render_json_200
    else
      @deck.destroy
      render_json_200
    end
  end

end
