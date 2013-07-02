require 'spec_helper'

describe GamesController do

  numberOfJsonItemsInGameJson=8

  # describe "Login" do
  #   it "response should be 200" do
  #     signIn
  #     get :index
  #     expect(response.status).to eq(200)
  #    end
  # end

  #************************************
  # GET: index
  # /games/ || /games.json (index)
  #************************************

  describe "Get game" do
    it "should return 1 item as json" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as json
      get :index, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json.should have( 1 ).items
    end
  end

  #**********************************
  # GET: show
  # /games/:id(.:format)
  #**********************************

  describe "Non-existant game" do
    it "should return 404 from HTML request" do

      # prep
      signIn

      # request as json
      get :show,  :id => '2', :format => :json

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Non-existant game" do
    it "should return 404 from HTML request" do

      # prep
      signIn

      # request as json
      get :show,  :id => '2', :format => :html

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Get game json" do
    it "should return json with 8 items" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as json
      get :show, :id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      json = JSON.parse( response.body )
      json.should have( numberOfJsonItemsInGameJson ).items
    end
  end

  describe "Get game as html" do
    it "should return html from proper template" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as html
      get :show, :id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should render_template( "games/show" )
    end
  end

  #**********************************
  # PUT: update
  # /games/:id(.:format)
  #**********************************

  describe "PUT game json" do
    it "should return json with #{numberOfJsonItemsInGameJson} items and: 'Name: New Name'" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as json
      put :update, :game => { :name => "New Name" }, :id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
      json.should have( numberOfJsonItemsInGameJson ).items
    end
  end

  #**********************************
  # POST: create
  # /games/:id(.:format)
  #**********************************

  describe "POST to create a game from json" do
    it "should return json with the posted game name" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as json
      post :create, :game => { :name => "New Name" }, :id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 201 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
      json.should have( numberOfJsonItemsInGameJson ).items
    end
  end

  #**********************************
  # DELETE: destroy
  # /games/:id(.:format)
  #**********************************

  describe "DELETE a game from json" do
    it "should responde with 200 as json" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as json
      post :destroy, :id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
    end
  end

end
