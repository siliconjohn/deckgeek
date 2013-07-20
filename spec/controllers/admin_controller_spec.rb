require 'spec_helper'

describe AdminController do

	#************************************
  # GET: index
  # /admin
  #************************************
	
	describe "Not signed in" do
    it "should return 404" do
      get :index
      expect(response.status).to eq(404)
    end
  end

  describe "Non-admin user" do
    it "should return 404" do
      signIn
      get :index
      expect(response.status).to eq(404)
    end
  end

  describe "Admin user" do
    it "should return 200" do
      signInAdmin
      get :index
      expect(response.status).to eq(200)
      response.header[ 'Content-Type' ].should include 'text/html'
      response.should render_template( "admin/index" )
    end
  end

end
