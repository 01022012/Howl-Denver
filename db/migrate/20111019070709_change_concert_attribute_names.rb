class ChangeConcertAttributeNames < ActiveRecord::Migration
  def up
    change_table :concerts do |t|
      t.remove :concert_datetime
      t.datetime :concert_date
    end
  end

  def down
    change_table :concerts do |t|
      t.remove :concert_date
      t.datetime :concert_datetime
    end
  end
end
