class ChangeDateFormat < ActiveRecord::Migration
  def up
    change_table :concerts do |t|
      t.remove :concert_time 
      t.remove :concert_date 
      t.datetime :concert_datetime
    end
  end

  def down
    change_table :concerts do |t|
      t.time :concert_time 
      t.date :concert_date
      t.remove :concert_datetime
    end
  end
end
