class CreateConcerts < ActiveRecord::Migration
  def up 
    create_table :concerts do |t|
      t.date :concert_date #Date of the show
      t.time :concert_time #Time of the show
      
      t.text :description  #Short description of the show
    end
  end

  def down
  end
end
