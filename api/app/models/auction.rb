class Auction < ApplicationRecord
    has_many :bids, dependent: :destroy

    validates :title, presence: true, length: { minimum: 5, maximum: 50 }
    validates :description, presence: true, length: { minimum: 10, maximum: 3000 }
    validates :reserve_price, numericality: { greater_than_or_equal_to: 0 }
    validate :expiry_cannot_be_in_past
    before_save :capitalize_title

    private

    def capitalize_title
        title.capitalize!
    end

    def expiry_cannot_be_in_past
        if expiry_date.present? && expiry_date <= Date.today
            errors.add :expiry_date, "can't be in the past"
        end
    end

end
