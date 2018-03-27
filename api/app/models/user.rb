class User < ApplicationRecord
    has_many :auctions, dependent: :nullify
    has_many :bids, dependent: :nullify

    validates :first_name, presence: true, length: {maximum: 20}
    validates :last_name, presence: true, length: {maximum: 20}

    VALID_EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates :email, presence: true, uniqueness: true, format: VALID_EMAIL_FORMAT

    has_secure_password
    
    private

    def full_name
        "#{first_name} #{last_name}".strip
    end

end
