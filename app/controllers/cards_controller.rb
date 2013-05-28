class CardsController < ApplicationController

  before_filter :require_login
  after_filter :add_no_cache_header

  # GET /games/:game_id/decks/:deck_id/cards(.:format)
  def index
    @cards = Card.where(:deck_id => params[:deck_id])

    if @cards.any?
      render :json => @cards.to_json(:include => {:style => {:only => :template_name }})
    else
      render_json_200
    end
  end

  # GET /games/:game_id/decks/:deck_id/cards/:id(.:format)
  def show
    begin
       @card = Card.find(params[:id],:conditions => {:deck_id => params[:deck_id]})
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      respond_to do |format|
        format.html
        format.json { render json: @card }
      end
    end
  end

  # PUT /games/:game_id/decks/:deck_id/cards/:id(.:format)
  def update
    begin
      @card = Card.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      if @card.update_attributes(params[:card])
        render json:@card, status: :ok
      else
        render json: @card.errors, status: :unprocessable_entity
      end
    end
  end

  # POST /games/:game_id/decks/:deck_id/cards(.:format)
  def create
    @card = Card.new(params[:card])
    @card.deck_id = params[:deck_id];

    if @card.save
       render json: @card, status: :created
    else
       render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/:game_id/decks/:deck_id/cards/:id(.:format)
  def destroy
    begin
       @card = Card.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render_json_200
    else
      @card.destroy
      render_json_200
    end
  end

end
