require 'spec_helper'

describe GamesController do

  describe "GET index" do
  it "response is 200" do
       get :index
     expect(response.status).to eq(200)
  end
end
end
