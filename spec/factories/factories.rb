FactoryGirl.define do
  
  factory :card do
  	
 	end
  
  factory :deck do
		after :create do |g|
     	 FactoryGirl.create( :card, :deck => g )
		end
 	end
  
  factory :game do 
    after :create do |g|
     	 FactoryGirl.create( :deck, :game => g )
		end
  end

end
