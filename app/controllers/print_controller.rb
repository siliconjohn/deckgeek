class PrintController < ApplicationController

	before_filter :require_login
	protect_from_forgery :except => :receive_guest
  #respond_to :html;

  def show
  	
  	begin
  		@games = Game.find( params[ :id ], :conditions => { :user_id => get_current_or_guest_user.id });
  	rescue ActiveRecord::RecordNotFound => e
      render_404
    end

    @decks = Deck.where( :game_id => params[:id] )
  end
  
  def index
    @cards =  Card.where( :id => 2 )

    respond_to do |format|
    format.pdf {
      html = render_to_string(:layout => "pdf.html.erb" , :action => "index.html.erb", :formats => [:html], :handlers => [:erb])
      kit = PDFKit.new(html)
      kit.stylesheets = get_stylesheets
      send_data(kit.to_pdf, :filename => "test.pdf", :type => 'application/pdf')
      return # to avoid double render call
      }
    end
  end

  def get_stylesheets
    # if Rails.env.production? 
    #   ["#{Rails.root}/public/assets/style-default.css.scss",
    #    "#{Rails.root}/public/assets/style-1.css.scss",
    #    "#{Rails.root}/public/assets/style-2.css.scss",
    #    "#{Rails.root}/public/assets/style-3.css.scss",
    #    "#{Rails.root}/public/assets/style-4.css.scss",
    #    "#{Rails.root}/public/assets/card.css.scss"]
    # else
      ["#{Rails.root}/app/assets/stylesheets/style-default.css.scss",
       "#{Rails.root}/app/assets/stylesheets/style-1.css.scss",
       "#{Rails.root}/app/assets/stylesheets/style-2.css.scss",
       "#{Rails.root}/app/assets/stylesheets/style-3.css.scss",
       "#{Rails.root}/app/assets/stylesheets/style-4.css.scss",
       "#{Rails.root}/app/assets/stylesheets/card.css.scss"]
    #end
  end


end
