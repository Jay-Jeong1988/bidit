class ClosedAuctionJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    auctions = Auction.where "expiry_date < ?", Date.tomorrow

    ClosedAuctionMailer.notify_closed_auctions(auctions).deliver_now
  end
end
