class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.text :bio
      t.string :website
      t.timestamps
    end
  end
end
