class CleanUpArtists < ActiveRecord::Migration
  def change
    change_table :artists do |t|
      t.remove :website
      t.string :website1
      t.string :website2
      t.string :website3
    end
  end
end
