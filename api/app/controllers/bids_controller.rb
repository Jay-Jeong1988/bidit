class BidsController < ApplicationController
    before_action :authenticate_user!

    def create
        bid = Bid.new bid_params
        bid.auction = Auction.find params[:auction_id]
        bid.user = current_user
        if bid.auction.user != current_user
            if bid.save
                render json: bid
            else
                head :conflict
            end
        else
            head :unauthorized
        end
    end

    def destroy
        bid = Bid.find params[:id]
        if bid.user == current_user 
            bid.destroy
        else
            head :unauthorized
        end
    end

    private

    def bid_params
        params.require(:bid).permit :price
    end

end
