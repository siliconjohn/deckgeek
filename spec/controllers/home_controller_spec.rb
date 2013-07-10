require 'spec_helper'

describe HomeController do

  describe "Not Logged in" do
    it "render non logged in home page" do
      get :index
      expect(response.status).to eq(302)
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should redirect_to( new_user_session_path )
    end
  end

   describe "Login" do
    it "render login home page" do
      signIn
      get :index
      expect(response.status).to eq(200)
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should render_template( "home/home" )
    end
  end
end
