source 'https://rubygems.org'

ruby '1.9.3'

gem 'rails', '3.2.3'
gem 'ejs', '1.1.1'
gem 'devise', '1.5.4' 
gem "pdfkit", "~> 0.5.2"
gem 'jquery-rails' 

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end

group :development, :test do
	gem 'sqlite3'
  gem 'rspec-rails', '2.13.1'
  gem 'shoulda-matchers'
  gem 'factory_girl_rails', "~> 4.0"
  gem 'webrick', '~> 1.3.1'
  gem 'capybara'
  gem 'selenium-webdriver'
  gem "wkhtmltopdf-binary", "~> 0.9.5.3"
end

group :production do 
  gem 'pg'
  gem 'rails_12factor'
  gem "wkhtmltopdf-heroku", "~> 1.0.0"
end
