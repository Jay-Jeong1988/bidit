Rails.application.routes.draw do

    resources :auctions, shallow: true do 
      resources :bids, only: [:create, :destroy]
      resources :publishers, :path => 'publish', only: :create
    end

    resources :tokens, only: [:index, :new, :create]
    
    resources :users, only: [:create]
  
    match '*unmatched_route', to: 'application#not_found', via: :all
end
