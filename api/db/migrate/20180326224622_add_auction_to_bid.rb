class AddAuctionToBid < ActiveRecord::Migration[5.1]
  def change
    add_reference :bids, :auction, foreign_key: true
  end
end
