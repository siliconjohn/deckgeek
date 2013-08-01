class PrintController < ApplicationController

	before_filter :require_login
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
    respond_to do |format|
    format.pdf {
      html = render_to_string(:layout => "pdf.html.erb" , :action => "index.html.erb", :formats => [:html], :handler => [:erb])
      kit = PDFKit.new(html)
      #kit.stylesheets << "#{Rails.root}/app/assets/stylesheets/application.css"
      send_data(kit.to_pdf, :filename => "test.pdf", :type => 'application/pdf')
      return # to avoid double render call
      }
    end

  end
end
