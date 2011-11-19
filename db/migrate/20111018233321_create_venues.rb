class CreateVenues < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :email
      t.string :website
      t.string :type
      t.text :description
      t.timestamps
    end
  end
end
