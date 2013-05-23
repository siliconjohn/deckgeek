class DecksController < ApplicationController

  before_filter :require_login
  after_filter :add_no_cache_header

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
    begin
       @deck = Deck.find(params[:id],:conditions => {:game_id => params[:game_id]})
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
        @cards= Card.where(:deck_id => params[:id])
        @styles= Style.all

      respond_to do |format|
        format.html
        format.json { render json: @deck }
      end
    end
  end

  # PUT /games/:game_id/decks/:id(.:format)
  def update
    begin
      @deck = Deck.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      if @deck.update_attributes(params[:deck])
        render json:@deck, status: :ok
      else
        render json: @deck.errors, status: :unprocessable_entity
      end
    end
  end

  # POST /games(.:format)
  def create
    @deck = Deck.new(params[:deck])
    @deck.game_id = params[:game_id];

    if @deck.save
      render json: @deck ,status: :created #render json:@deck,status::created,location:@deck
    else
      render json: @deck.errors, status: :unprocessable_entity
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
