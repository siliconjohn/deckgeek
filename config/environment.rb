# Load the rails application
require File.expand_path('../application', __FILE__)

ActionMailer::Base.smtp_settings = {
  :address        => 'smtp.sendgrid.net',
  :port           => '587',
  :authentication => :plain,
  :user_name      => ENV['app18557776@heroku.com'],
  :password       => ENV['bvknjquu'],
  :domain         => 'heroku.com',
  :enable_starttls_auto => true
}

# Initialize the rails application
Gg::Application.initialize!
