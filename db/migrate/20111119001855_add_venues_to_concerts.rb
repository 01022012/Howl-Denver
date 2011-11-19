class AddVenuesToConcerts < ActiveRecord::Migration
  def change
    change_table :concerts do |t|
      t.integer :venue_id
    end
  end
end
