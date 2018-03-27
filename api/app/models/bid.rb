class Bid < ApplicationRecord
    belongs_to :auction
    belongs_to :user

    validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }

    validate :be_greater_than_reserve_price

    private

    def be_greater_than_reserve_price
        reserve_price = auction.reserve_price
        if price < reserve_price
            errors.add :price, "cannot be less than current price"
        end
    end

end
