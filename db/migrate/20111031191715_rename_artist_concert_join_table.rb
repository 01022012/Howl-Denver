class RenameArtistConcertJoinTable < ActiveRecord::Migration
  def self.up
    rename_table :concerts_artists, :artists_concerts
  end
  
   def self.down
    rename_table :concerts_artists, :artists_concerts
  end
end
