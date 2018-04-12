class AuctionsController < ApplicationController
    before_action :find_auction, only: [:update, :show, :destroy]
    before_action :authenticate_user!

    ClosedAuctionJob.set(wait_until: Date.tomorrow.midnight).perform_later
    
    def index
        auctions = Auction.order created_at: :desc
        render json: auctions
    end

    def create
        auction = Auction.new auction_params
        auction.user = current_user
        render json: {id: auction.id} if auction.save!
    end

    def update
        if @auction.user == current_user
            render json: {id: @auction.id} if @auction.update auction_params
        else
            unauthorized_user
        end
    end

    def show
        render json: @auction
    end

    def destroy
        if @auction.user == current_user
            @auction.destroy
        else
            unauthorized_user
        end
    end
    

    private

    def auction_params
        params.require(:auction)
        .permit(:title, :description, :reserve_price, :expiry_date)
    end

    def find_auction
        @auction = Auction.find params[:id]
    end


end
