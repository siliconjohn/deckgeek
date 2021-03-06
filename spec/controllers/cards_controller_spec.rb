require 'spec_helper'

describe CardsController do

  numberOfJsonItemsInCard=7

  #************************************
  # GET: index
  #************************************

  describe "Get cards as json" do
    it "should return json with 1 item" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :index, :deck_id => @game.decks.last.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json.should have( 1 ).items
    end
  end

  describe "Get cards as html" do
    it "should return html page" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :index, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should render_template( "cards/index" )
    end
  end

  #**********************************
  # GET: show
  #**********************************

  describe "Non-existant card" do
    it "should return 404 from json request" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :show, :id => @game.decks.last.id+1, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Non-existant card" do
    it "should return 404 from HTML request" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :show, :id => @game.decks.last.id+1, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Get card json" do
    it "should return json with #{numberOfJsonItemsInCard} items" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :show, :id => @game.decks.first.cards.first.id, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      json = JSON.parse( response.body )
      json.should have( numberOfJsonItemsInCard ).items
    end
  end

  describe "Get card as html" do
    it "should return html from proper template" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as html
      get :show, :id => @game.decks.first.cards.first.id, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should render_template( "cards/show" )
    end
  end

  #**********************************
  # PUT: update
  #**********************************

  describe "PUT card json" do
    it "should return json with #{numberOfJsonItemsInCard} items" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      put :update, :card => { :name => "New Name" }, :id => @game.decks.first.cards.first.id, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
      json.should have( numberOfJsonItemsInCard ).items
    end
  end

  #**********************************
  # POST: create
  #**********************************

  describe "POST to create a card from json" do
    it "should return json with the posted card name" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      post :create, :card => { :name => "New Name" },  :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 201 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
      json.should have( numberOfJsonItemsInCard ).items
    end
  end

  #**********************************
  # DELETE: destroy
  #**********************************

  describe "DELETE a card from json" do
    it "should responde with 200 as json" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      post :destroy, :id => @game.decks.first.cards.first.id, :deck_id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
    end
  end
end
