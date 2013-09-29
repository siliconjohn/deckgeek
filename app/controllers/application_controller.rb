class ApplicationController < ActionController::Base
  
  def require_login
    unless get_current_or_guest_user  
      redirect_to "/users/sign_in"
    end
  end

  def require_admin_login
    unless current_user.try(:admin?)
      render_404  
    end
  end

  def render_json_200
    render json:'[]', status: 200
  end

  def render_404
    respond_to do |format|
      format.html { render :file => "#{Rails.root}/public/404", :layout => false, :status => :not_found }
      format.xml  { head :not_found }
      format.json { render json:'[]', status: 404 }
      format.any  { head :not_found }
    end
  end

  def log(v)
    logger.info(v)
  end

  ########################################
  # Guest user/user stuff
  ########################################

  helper_method :get_current_or_guest_user

  def get_current_or_guest_user
    current_user || get_guest_user
  end

  def get_current_user_or_create_guest_user
    if current_user
      current_user
    else
      get_or_create_guest_user
    end
  end

  def get_guest_user
    @guest_user = User.find( session[ :guest_user_id ] )
  rescue ActiveRecord::RecordNotFound 
    session[:guest_user_id] = nil
  end

  def get_or_create_guest_user
    @cached_guest_user ||= User.find( session[ :guest_user_id ] ||= create_guest_user.id )
  rescue ActiveRecord::RecordNotFound 
     session[ :guest_user_id ] = nil 
  end

  def destroy_guest_user
    get_guest_user.destroy
    session[ :guest_user_id ] = nil
  end

  private
 
  def transfer_guest_games_to_user 
    guest_games = get_guest_user.games.all
      guest_games.each do |game|
        game.user_id = current_user.id
      game.save!
    end

    # create a blank game if needed
    user_games=current_user.games.all
    if user_games.length==0
      game = Game.new 
      game.user_id = current_user.id;
      game.save
      deck = Deck.new({ game_id: game.id })
      deck.save
      card = Card.new({ deck_id: deck.id })
      card.save
      card = Card.new({ deck_id: deck.id })
      card.save 
    end
  end

  def create_guest_user
    u = User.create(:email => "guest_#{Time.now.to_i}#{rand(99)}@guest.com")
    u.save!(:validate => false)
    session[:guest_user_id] = u.id
    add_example_game_to_user( u )
    u
  end
 
  ########################################
  # Default game, deck and card stuff
  ########################################

  def add_example_game_to_user( user )
    game = Game.new 
    game.user_id = user.id;
    game.save
    deck = Deck.new({ game_id: game.id })
    deck.save
    card = Card.new({ deck_id: deck.id })
    card.save
    card = Card.new({ deck_id: deck.id })
    card.save
  end

  def add_example_deck_to_user( game )
    deck = Deck.new({ game_id: game.id })
    deck.save
    card = Card.new({ deck_id: deck.id })
    card.save
    card = Card.new({ deck_id: deck.id })
    card.save
  end

end
