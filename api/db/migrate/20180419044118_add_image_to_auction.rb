class AddImageToAuction < ActiveRecord::Migration[5.1]
  def change
    add_column :auctions, :image, :string
  end
end
