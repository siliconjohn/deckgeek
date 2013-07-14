class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :admin, :created_at
  
  has_many :games, :inverse_of => :user, :dependent => :destroy

	def as_json(a)
		super( :only => [ :email, :id, :created_at, :admin, :last_sign_in_ip, :sign_in_count, :last_sign_in_at ], 
           :include => [{ :games => { :only => :id }}])
	end
end

