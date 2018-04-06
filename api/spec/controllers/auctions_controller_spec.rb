require 'rails_helper'

RSpec.describe AuctionsController, type: :controller do

    describe '#index' do
        it 'send a json array containing all auctions' do
            userA = User.new first_name: 'jaja',
                last_name: 'hahah', 
                email: 'alal@alal.com', 
                password: 'akakak'
            
            userA.save

            Auction.create title: 'testing auctions!',
            description: 'testing auctions again and again',
            reserve_price: 1389,
            user: userA

            get :index
            json = JSON.parse(response.body)

            expect(json.count).to eq(1)
        end
    end #index

    describe '#create' do

        context 'when an user is signed in && a valid post is requested' do
            before do
                userA = User.create first_name: 'jaja',
                last_name: 'hahah', 
                email: 'alal@alal.com', 
                password: 'akakak'
                userA.save
                jwt = JWT.encode( { id: userA.id,
                    first_name: userA.first_name,
                    last_name: userA.last_name,
                    full_name: userA.full_name,
                    email: userA.email
                    }, Rails.application.secrets.secret_key_base )
                    
                    headers = { 'AUTHORIZATION': jwt,
                        'Contnet-Type': 'application/json' }
                    request.headers.merge! headers
            end
                    
            def valid_request
                post :create, params: { auction: { title: 'testing auctions!',
                    description: 'testing auctions again and again',
                    reserve_price: 1389
                    }
                }
            end

            it 'creates an auction in database' do
                before_count = Auction.count
                valid_request
                after_count = Auction.count                
                expect(after_count).to eq(before_count + 1)                    
            end
        end
    end #create

end
