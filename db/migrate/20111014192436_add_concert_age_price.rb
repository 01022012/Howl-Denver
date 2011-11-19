class AddConcertAgePrice < ActiveRecord::Migration
  def up
    change_table :concerts do |t|
      t.string :age
      t.string :price
    end
  end

  def down
    change_table :concerts do |t|
      t.remove :age 
      t.remove :price 
    end
  end
end
