class ClosedAuctionMailer < ApplicationMailer

    def notify_closed_auctions(auctions)
        @auctions = auctions

        mail( 
            to: 'lastDayIn2017@gmail.com',
            subject: 'Today\'s closed auctions'
        )
    end
    
end
