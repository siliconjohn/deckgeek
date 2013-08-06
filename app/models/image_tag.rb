class ImageTag < ActiveRecord::Base  

  attr_accessible :tag_id, :image_id

  belongs_to :tag
  belongs_to :image

end
