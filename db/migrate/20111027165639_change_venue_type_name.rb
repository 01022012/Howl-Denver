class ChangeVenueTypeName < ActiveRecord::Migration
  def up
    change_table :venues do |t|
      t.remove :type
      t.string :venue_type
    end
  end

  def down
    change_table :venues do |t|
      t.remove :venue_type
      t.string :type
    end
  end
end
