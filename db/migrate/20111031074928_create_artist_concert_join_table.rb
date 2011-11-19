class CreateArtistConcertJoinTable < ActiveRecord::Migration
  def change
    create_table :concerts_artists do |t|
      t.integer :concert_id
      t.integer :artist_id     
    end
  end
end
