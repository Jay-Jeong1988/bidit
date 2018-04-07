class Auction < ApplicationRecord
    include AASM

    aasm whiny_transitions: false do 
        state :draft, initial: true
        state :published
        state :reserve_met

        event :publish do
            transitions from: :draft, to: :published
        end

        event :reserve do
            transitions from: :published, to: :reserve_met
        end
        
    end

    has_many :bids, dependent: :destroy
    belongs_to :user

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

    # def created_at_to_date
    #     self.created_at.to_date
    # end

end
