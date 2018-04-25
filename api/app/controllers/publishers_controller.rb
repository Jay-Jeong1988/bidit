class PublishersController < ApplicationController
    before_action :authenticate_user!

    def create
        auction = Auction.find params[:auction_id]
        if auction.aasm_state == 'draft'
            if auction.user == current_user
                if auction.publish && auction.save
                    render json: auction
                else
                    head :conflict
                end
            else
                head :unauthorized
            end
        elsif auction.aasm_state == 'published'
            if auction.reserve && auction.save
                bids = auction.bids.order(created_at: :desc).map do |bid|
                    att = bid.attributes
                    att['user'] = bid.user&.attributes
                    att
                end
                render json: { auction: auction, bids: bids }
            else
                head :conflict
            end
        else
            bids = auction.bids.order(created_at: :desc).map do |bid|
                att = bid.attributes
                att['user'] = bid.user&.attributes
                att
            end
            render json: { auction: auction, bids: bids }
        end
    end






end
