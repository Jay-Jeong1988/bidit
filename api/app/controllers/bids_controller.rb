class BidsController < ApplicationController

    def create
        bid = Bid.new bid_params
        bid.auction = Auction.find params[:auction_id]
        bid.save
    end

    def destroy
        bid = Bid.find params[:id]
        bid.destroy
    end

    private

    def bid_params
        params.require(:bid).permit :price
    end
end
