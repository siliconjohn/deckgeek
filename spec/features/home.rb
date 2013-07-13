require 'spec_helper'

# 
describe "the signin process", :type => :feature do
  # before :each do
     User.create(:email => '2@2.com', :password => '111111')
  # end , :js => true

  it "signs me in" do
    visit '/'
    fill_in 'idemail', :with => '2@2.com'
    fill_in 'user_password', :with => '111111'
    click_button 'signinbtn'
    expect(page).to have_content 'Sign Out'
  end
end