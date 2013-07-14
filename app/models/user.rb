class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :admin, :created_at
  # attr_accessible :title, :body

  has_many :games, :inverse_of => :user, :dependent => :destroy

	def as_json(a)
		super( :only => [ :email, :id, :created_at, :admin ], :include => [{:games => {:only => :id }}])
	end
end
