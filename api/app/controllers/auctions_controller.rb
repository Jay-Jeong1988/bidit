class AuctionsController < ApplicationController
    before_action :find_auction, only: [:update, :show, :destroy]

    def index
        auctions = Auction.order created_at: :desc
        render json: auctions
    end

    def create
        auction = Auction.new auction_params
        if auction.save
            render json: {id: auction.id}
        else
            head :conflic
        end
    end

    def update
        if auction.update auction_params
            render json: {id: auction.id}
        else
            head :conflict
        end
    end

    def show
        render json: auction
    end

    def destroy
        auction.destroy
    end
    

    private

    def auction_params
        params.require(:auction)
        .permit(:title, :description, :reserve_price, :expiry_date)
    end

    def find_auction
        auction = auction.find params[:id]
    end


end
