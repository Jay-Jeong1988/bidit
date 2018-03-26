class CreateAuctions < ActiveRecord::Migration[5.1]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :description
      t.decimal :reserve_price, precision: 10, scale: 2
      t.datetime :expiry_date
      t.timestamps
    end
  end
end
