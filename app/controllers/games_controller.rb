class GamesController < ApplicationController

  before_filter :require_login
  protect_from_forgery :except => :receive_guest

  # GET /games(.:format)
  def index
    @games = Game.where( :user_id => get_current_or_guest_user.id )

    if @games.any?
      render json: @games
    else
      render_json_200
    end
  end

  # GET /games/:id(.:format)
  def show
    begin
      if get_current_or_guest_user.admin
       @game = Game.find( params[:id])
     else
       @game = Game.find( params[:id], :conditions => { :user_id => get_current_or_guest_user.id })
      end
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      @decks = Deck.where( :game_id => params[:id] )

      respond_to do |format|
        format.html
        format.json { render json: @game }
      end
    end
  end

  # PUT /games/:id(.:format)
  def update
    begin
       @game = Game.find( params[:id] )
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      if @game.update_attributes( params[:game] )
        render json:@game, status: :ok
      else
        render json: @game.errors, status: :unprocessable_entity
      end
    end
  end

  # POST /games(.:format)
  def create
    @game = Game.new( params[:game] )
    @game.user_id = get_current_or_guest_user.id;

    if @game.save
      add_example_deck_to_user( @game )

      render json: @game, status: :created, location: @games
    else
      format.json { render json: @game.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /games/:id(.:format)
  def destroy
    begin
       @game = Game.find( params[:id], :conditions => { :user_id => get_current_or_guest_user.id })
    rescue ActiveRecord::RecordNotFound => e
      render_404
    else
      @game.destroy
      render_json_200
    end
  end








  def print
  
    if !get_current_user
      render "printguest"
      return
    end
  
    @game = Game.find( params[:game_id])
   
    respond_to do |format|
      format.html
      format.pdf {
      
      PDFKit.configure do |config|
        config.default_options = {
        #  :Orientation => 'Landscape',
        :page_size     => 'Letter',
        :margin_top    => '0.1in',
        :margin_right  => '0.1in',
        :margin_bottom => '0.1in',
        :margin_left   => '0.1in',
        :disable_smart_shrinking=>true,
        :dpi => '300'
        }
      end
      
      html = render_to_string(:layout => "pdf.html.erb" , :action => "printpdf.html.erb", :formats => [:html], :handlers => [:erb])
      kit = PDFKit.new(html)
      kit.stylesheets = get_stylesheets
      send_data(kit.to_pdf, :filename => @game.name + ".pdf", :type => 'application/pdf')
    }
    end

  end



#normalize.css

  def get_stylesheets
   if Rails.env.production? 
    [
     "#{Rails.root}/vendor/assets/stylesheets/pdfprint.css"   # "#{Rails.root}/public/assets/pdfprint.css"
    ]
   else
    [
     "#{Rails.root}/vendor/assets/stylesheets/pdfprint.css"   
    ]
   end
  end







end
