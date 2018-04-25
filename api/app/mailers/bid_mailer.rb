class BidMailer < ApplicationMailer

    def notify_auction_owner(bid)
        @bid = bid
        @auction = bid.auction
        @auction_owner = @auction.user

        mail(
            to: 'lastDayIn2017@gmail.com',
            subject: 'You have new bid !'
        )
    end


end
