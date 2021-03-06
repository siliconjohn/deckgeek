require 'spec_helper'

describe DecksController do

  numberOfJsonItemsInDeckJson=7

  #************************************
  # GET: index
  # /games/:game_id/decks(.:format)
  #************************************

  describe "Get decks as json" do
    it "should return json with 1 item" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :index, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json.should have( 1 ).items
    end
  end

  #**********************************
  # GET: show
  # /games/:game_id/decks/:id(.:format)
  #**********************************

  describe "Non-existant deck" do
    it "should return 404 from json request" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :show,  :id => @game.decks.first.id+1, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Non-existant deck" do
    it "should return 404 from HTML request" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :show,  :id => @game.decks.first.id+1, :game_id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Get deck json" do
    it "should return json with #{numberOfJsonItemsInDeckJson} items" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      get :show, :id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      json = JSON.parse( response.body )
      json.should have( numberOfJsonItemsInDeckJson ).items
    end
  end

  #**********************************
  # PUT: update
  # /games/:game_id/decks/:id(.:format)
  #**********************************

  describe "PUT deck json" do
    it "should return json with #{numberOfJsonItemsInDeckJson} items" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      put :update, :deck => { :name => "New Name" }, :id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
      json.should have( numberOfJsonItemsInDeckJson ).items
    end
  end

  #**********************************
  # POST: create
  # /games/:game_id/decks/:id(.:format)
  #**********************************

  describe "POST to create a deck from json" do
    it "should return json with the posted deck name" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      post :create, :deck => { :name => "New Name" }, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 201 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
    end
  end

  #**********************************
  # DELETE: destroy
  # /games/:game_id/decks/:id(.:format)
  #**********************************

  describe "DELETE a deck from json" do
    it "should responde with 200 as json" do

      # prep
      signIn
      @game = FactoryGirl.create( :game, :user_id => $user.id );

      # request as json
      post :destroy, :id => @game.decks.first.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
    end
  end
end
