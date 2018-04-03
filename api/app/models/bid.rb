class Bid < ApplicationRecord
    belongs_to :auction
    belongs_to :user

    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
    
    validate :be_greater_than_current_price

    private

    def be_greater_than_current_price
        auction = self.auction
        current_bid = auction.bids.last
        if current_bid.present?
            if self.price < current_bid.price
                errors.add :price, "cannot be less than current price"
            end
        end
    end

end
