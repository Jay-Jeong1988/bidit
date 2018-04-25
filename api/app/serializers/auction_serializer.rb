class AuctionSerializer < ActiveModel::Serializer
  
  # TODO: find way to exclude attributes instead of including
  attributes :id, :title, :description,:reserve_price,
   :expiry_date, :created_at, :updated_at, :aasm_state

  belongs_to :user, key: :seller
  class UserSerializer < ActiveModel::Serializer
    attributes(
      :id, :first_name, :last_name,
      :full_name, :created_at, :updated_at, :email, :address, :longitude, :latitude
      )
  end
    
    
  has_many :bids
  class BidSerializer < ActiveModel::Serializer
    attributes :id, :price, :created_at, :updated_at, :user
      
    belongs_to :user, key: :bidder
    class UserSerializer < ActiveModel::Serializer
      attributes :id, :bidder_full_name, :email
      
      def bidder_full_name
        object.full_name
      end
    end

  end 

end