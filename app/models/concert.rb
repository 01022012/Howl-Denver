# Model for concerts.

class Concert < ActiveRecord::Base
  validates :concert_date, :description, :presence => true
  
  has_and_belongs_to_many :artists
  belongs_to :venue 
end