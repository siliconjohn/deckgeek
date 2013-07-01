require 'spec_helper'

def signIn
  $user = User.create(:email => "dedee33zz@gmail.com", :password => "111111")
  sign_in $user
end

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
  # # PUT /games/:id(.:format) (show)
  #**********************************

  describe "PUT a game as json" do
    it "with 8 items" do
      signIn
      @game=Game.create( :user_id => $user.id );
      @game.name="test"
      @newJson = @game.to_json
      put :show, :id => @game.id, :game => {"description"=>"My awesome game description.2", "name"=>"test", "user_id"=>1}, :format => :json

      expect(response.status).to eq(200)
      response.header['Content-Type'].should include 'application/json'
      json = JSON.parse(response.body)
      json.should have(8).items
      puts json json["name"].should == "test"

    end
  end
end
