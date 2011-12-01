class Artist < ActiveRecord::Base
  validates :name, :presence => true 
  validates_format_of :website1, :website2, :website3, :with => URI::regexp(%w(http https)), :allow_blank => true
  
  has_and_belongs_to_many :concerts 
  
  def self.search term 
      where("name LIKE ?", "%" + term + "%") 
  end
  
  def self.create_many_artists artist_names
    new_artist_ids = []
    artist_names.each do |a_name|
      artist = self.create( :name => a_name )
      new_artist_ids << artist.id 
    end
    new_artist_ids
  end
end
