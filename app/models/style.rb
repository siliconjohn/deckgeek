class Style < ActiveRecord::Base
  has_many :cards;
  attr_accessible :description, :name, :class_name
end
