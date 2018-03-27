class AuctionSerializer < ActiveModel::Serializer
  
  # TODO: find way to exclude attributes instead of including
  attributes :id, :title, :description, :expiry_date, :created_at, :updated_at
  
  
  belongs_to :user, key: :author

  class UserSerializer < ActiveModel::Serializer
    attributes(
      :id, :first_name, :last_name,
      :full_name, :created_at, :updated_at
      )
    end
    
    
    has_many :bids
    
    class BidSerializer < ActiveModel::Serializer
      attributes :id, :price, :created_at, :updated_at, :author_full_name
      
      def author_full_name
        # To get the model instance that's being serialized,
        # use `object` instead of `self`.
        object.user&.full_name
      end

    end
  end

end