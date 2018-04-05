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
                render json: auction
            else
                head :conflict
            end
        else
            render json: auction
        end
    end






end
