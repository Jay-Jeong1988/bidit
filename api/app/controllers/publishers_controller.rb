class PublishersController < ApplicationController
    before_action :authenticate_user!

    def create
        auction = Auction.find params[:auction_id]
        if auction.user == current_user
            if auction.publish && auction.save
                render json: auction
            else
                head :conflict
            end
        else
            head :unauthorized
        end
    end


end
