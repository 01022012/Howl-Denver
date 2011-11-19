class Venue < ActiveRecord::Base
  validates :name, :address, :venue_type, :presence => true 
  validates_format_of :website, :with  => URI::regexp(%w(http https)), :allow_blank => true 
  has_many :concerts 
  
  def self.search term 
      result = where("name LIKE ? OR address LIKE ?", "%" + term + "%", "%" + term + "%") 
      
      result.each do |v|
        logger.debug v.name 
        logger.debug v.address
      end
  end
end
