class Venue < ActiveRecord::Base
  validates :address, :venue_type, :name, :presence => true 
  validates_format_of :website1, :website2, :website3, :with  => URI::regexp(%w(http https)), :allow_blank => true 
  has_many :concerts 
  
  def self.search term 
      result = where("name LIKE ? OR address LIKE ?", "%" + term + "%", "%" + term + "%") 
  end
end
