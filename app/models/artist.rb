class Artist < ActiveRecord::Base
  validates :name, :presence => true 
  validates_format_of :website, :with => URI::regexp(%w(http https)), :allow_blank => true
  
  has_and_belongs_to_many :concerts 
  
  def self.search term 
      where("name LIKE ?", "%" + term + "%") 
  end
  
  def self.add_new_artists_to_concert artist_names, c
    artist_names.each do |a_name|
      artist = self.create( :name => a_name )
      c.artists << artist 
      c
    end
  end
end
