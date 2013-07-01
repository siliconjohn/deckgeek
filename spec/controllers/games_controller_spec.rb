require 'spec_helper'

describe GamesController do

  describe "Login" do
    it "response should be 200" do
      signIn
      get :index
      expect(response.status).to eq(200)
    end
  end

  #************************************
  # GET /games/ || /games.json (index)
  #************************************

  describe "Get all games as json" do
    it "should return json/200 with 8 json items" do
      signIn
      @game=Game.create( :user_id => $user.id );
      @game2=Game.create( :user_id => $user.id );
      get :index, :format => :html
      expect(response.status).to eq(200)
      response.header['Content-Type'].should include 'application/json'
      json = JSON.parse(response.body)
      json.should have(2).items
    end
  end

  #**********************************
  # GET /games/:id  (show)
  #**********************************

  describe "Non-existant game as html and JSON" do
    it "should return 404" do
      signIn
      get :show,  :id => '1', :format => :json
      expect(response.status).to eq(404)
      get :show,  :id => '1', :format => :html
      expect(response.status).to eq(404)
    end
  end

  describe "Get a game as json" do
    it "should return json, 200 with 8 items" do
      signIn
      @game=Game.create( :user_id => $user.id );
      get :show, :id => @game.id, :format => :json
      expect(response.status).to eq(200)
      response.header['Content-Type'].should include 'application/json'
      json = JSON.parse(response.body)
      json.should have(8).items
    end
  end

  describe "Get a game as html" do
    it "should return games/show html" do
      signIn
      @game=Game.create( :user_id => $user.id );
      get :show, :id => @game.id, :format => :html
      expect(response.status).to eq(200)
      response.header['Content-Type'].should include 'text/html'
      response.should render_template("games/show")
    end
  end

  #**********************************
  # PUT /games/:id(.:format)
  #**********************************

  describe "PUT/change a game as json" do
    it "should change game name" do
      signIn
      @game=Game.create( :user_id => $user.id );
      put :update, :id => @game.id, :game => { :name => "test" }, :format => :json

      expect(response.status).to eq(200)
      response.header['Content-Type'].should include 'application/json'
      json = JSON.parse(response.body)
      json.should have(8).items
      json["name"].should == "test"
    end
  end

  #**********************************
  # POST to create /games/(.:format)
  #**********************************

  describe "POST a game as json" do
    it "should create a game with the name test" do
      signIn
      post :create, :game => { :name => "test" }, :format => :json
      expect(response.status).to eq(201)
      response.header['Content-Type'].should include 'application/json'
      json = JSON.parse(response.body)
      json.should have(8).items
      json["name"].should == "test"
    end
  end

  #**********************************
  # DELETE /games/:id(.:format)
  #**********************************

  describe "DELETE a game as json" do
    it "should delete a game" do
      signIn
      @game=Game.create( :user_id => $user.id );
      put :destroy, :id => @game.id, :format => :json
      expect(response.status).to eq(200)
      response.header['Content-Type'].should include 'application/json'
    end
  end
end
