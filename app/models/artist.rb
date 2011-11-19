class Artist < ActiveRecord::Base
  validates :name, :presence => true 
  validates_format_of :website, :with => URI::regexp(%w(http https)), :allow_blank => true
  
  has_and_belongs_to_many :concerts 
  
  def self.search term 
      where("name LIKE ?", "%" + term + "%") 
  end
end
