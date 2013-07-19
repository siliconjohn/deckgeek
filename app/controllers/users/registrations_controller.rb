class Users::RegistrationsController < Devise::RegistrationsController
  
  protected
  
  # after sign in create default game or transfer guest game to new user
    
  def after_sign_up_path_for(resource)
  	
  	if session[ :guest_user_id ]
      transfer_guest_games_to_user
      destroy_guest_user
    end
	
		guest = get_guest_user

  	if guest 
  	  if guest.games.all.length==0
    		add_example_game_to_user ( resource )
    	end
    else
    	if resource.games.all.length==0
    		add_example_game_to_user ( resource )
    	end
    end

    super
  end  

end