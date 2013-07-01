require 'spec_helper'

describe DecksController do

  #************************************
  # GET: index
  # /games/:game_id/decks(.:format)
  #************************************

  describe "Get decks as json" do
    it "should return json with 1 item" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );
      @deck = Deck.create( :game_id => @game.id );

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
      @game = Game.create( :user_id => $user.id );

      # request as json
      get :show,  :id => '1', :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Non-existant deck" do
    it "should return 404 from HTML request" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );

      # request as json
      get :show,  :id => '1', :game_id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 404 )
    end
  end

  describe "Get deck json" do
    it "should return json with 7 items" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );
      @deck = Deck.create( :game_id => @game.id );
      @card = Card.create( :deck_id => @deck.id );

      # request as json
      get :show, :id => @deck.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      json = JSON.parse( response.body )
      json.should have( 7 ).items
    end
  end

  describe "Get deck as html" do
    it "should return html from proper template" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );
      @deck = Deck.create( :game_id => @game.id );
      @card = Card.create( :deck_id => @deck.id );

      # request as html
      get :show, :id => @deck.id, :game_id => @game.id, :format => :html

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should render_template( "decks/show" )
    end
  end

  #**********************************
  # PUT: update
  # /games/:game_id/decks/:id(.:format)
  #**********************************

  describe "PUT deck json" do
    it "should return json with 7 items" do

      # prep
      signIn
      @game = Game.create( :user_id => $user.id );
      @deck = Deck.create( :game_id => @game.id );
      @card = Card.create( :deck_id => @deck.id );

      # request as json
      put :update, :deck => { :name => "New Name" }, :id => @deck.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
      json = JSON.parse( response.body )
      json[ "name" ].should == "New Name"
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
      @game = Game.create( :user_id => $user.id );

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
      @game = Game.create( :user_id => $user.id );
      @deck = Deck.create( :game_id => @game.id );

      # request as json
      post :destroy, :id => @deck.id, :game_id => @game.id, :format => :json

      # tests
      expect( response.status ).to eq( 200 )
      response.header[ 'Content-Type' ].should include 'application/json'
    end
  end

end
