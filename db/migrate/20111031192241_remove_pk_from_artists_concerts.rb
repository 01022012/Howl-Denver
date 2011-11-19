class RemovePkFromArtistsConcerts < ActiveRecord::Migration
  def up
    change_table :artists_concerts do |t|
      t.remove :id
    end
  end

  def down
  end
end
