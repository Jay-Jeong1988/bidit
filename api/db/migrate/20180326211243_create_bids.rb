class CreateBids < ActiveRecord::Migration[5.1]
  def change
    create_table :bids do |t|
      t.decimal :price, precision: 10, scale: 2
      t.timestamps
    end
  end
end
