class GamesController < ApplicationController

  before_filter :require_login

  # ROUTE: games#index
  # GET /games.json
  def index
    @games = Game.where(:user_id => current_user.id)# || params[:user_id]

    respond_to do |format|
      format.json { render json: @games }
    end
  end

  # ROUTE: games#show
  # GET /games/1
  # GET /games/1.json
  def show
    @game = Game.find(params[:id],:conditions => {:user_id => current_user.id})

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @game }
    end
  end

  # ROUTE: games#update
  # PUT /games/1
  # PUT /games/1.json
  def update
    @game = Game.find(params[:id])

    respond_to do |format|
      if @game.update_attributes(params[:game])
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # ROUTE: games#create
  # POST /games
  # POST /games.json
  def create
    @game = Game.new(params[:game])
    @game.user_id = current_user.id;

    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
        format.json { render json: @game, status: :created, location: @game }
      else
        format.html { render action: "new" }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # ROUTE: games#destroy
  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game = Game.find(params[:id])
    @game.destroy

    respond_to do |format|
      format.html { redirect_to games_url }
      format.json { head :no_content }
    end
  end

  private

  def require_login
    unless current_user
      redirect_to "/users/sign_in"
    end
  end
end
