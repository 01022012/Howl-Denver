class CleanUpVenues < ActiveRecord::Migration
  def change
    change_table :venues do |t|
      t.remove :email
      t.remove :phone
      t.remove :website
      
      t.string :website1
      t.string :website2
      t.string :website3
    end
  end
end
