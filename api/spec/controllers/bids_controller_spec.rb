require 'rails_helper'

RSpec.describe BidsController, type: :controller do

    def auction_user
        user ||= User.new({ first_name: 'jaja', 
                            last_name: 'hahaah', 
                            email: 'alal@alal.com', 
                            password: 'akakak'
                            })
        if user.valid?
            user.save
        end
        User.find_by email: user.email
    end

    def current_user
        user ||= User.new({ first_name: 'cucu',
                            last_name: 'cucucu',
                            email: 'cucu@cucu.com',
                            password: 'cucucu'
                            })
        if user.valid?
            user.save
        end
        User.find_by email: user.email
    end

    def auction
        auction ||= Auction.new({ title: 'tesating auctions!',
            description: 'testing auctions again and again',
            reserve_price: 1389,
            user: auction_user })
        
        if auction.valid?
            auction.save
        end
        Auction.find_by title: auction.title        
    end

    def current_user_token
        jwt ||= JWT.encode( { id: current_user.id,
            first_name: current_user.first_name,
            last_name: current_user.last_name,
            full_name: current_user.full_name,
            email: current_user.email
            }, Rails.application.secrets.secret_key_base )
    end

    def auction_user_token
        jwt ||= JWT.encode( { id: auction_user.id,
            first_name: auction_user.first_name,
            last_name: auction_user.last_name,
            full_name: auction_user.full_name,
            email: auction_user.email
            }, Rails.application.secrets.secret_key_base )
    end
    
    describe '#create' do
        
        before do
            current_user.save
            auction_user.save
            auction.save
        end
        
        context 'when an user sends a http POST request' do
            
            def valid_params
                { 
                    params: { 
                        bid: { 
                            price: 1294 
                        },
                        auction_id: auction.id 
                    }
                }
            end

            def invalid_params
                {   
                    params: { 
                        bid: { 
                            price: nil 
                        },
                        auction_id: auction.id
                    }
                }
            end
            
            context 'when an user sends a valid token in the request(current user must not be bid.user)' do
                before do
                    headers = { 'AUTHORIZATION': current_user_token }
                    request.headers.merge! headers
                end
                
                context 'with valid params' do
 
                    it 'creates a bid' do
                        before_count = auction.bids.count
                        post :create, valid_params
                        after_count = auction.bids.count
                        expect(after_count).to eq(before_count + 1)
                    end
                end

                context 'with invalid params' do

                    it 'sends back a conflict error(409)' do
                        post :create, invalid_params
                        expect(response.status).to eq(409)
                    end
                end

            end #context 'when an user sends a valid token in the request(signed in)'

            context 'when an user does not send a token ( nil: user is not signed in )' do
                before do
                    headers = { 'AUTHORIZATION': nil }
                    request.headers.merge! headers
                end

                it 'sends back unauthroized error(401)' do
                    post :create, valid_params
                    expect(response.status).to eq(401)     
                end

            end #context 'when an user sends an invalid token ( undefined meaning not_signed_in )'

            context 'when bid.user is same as current_user' do
                before do
                    current_user.save
                    headers = { 'AUTHORIZATION': auction_user_token }
                    request.headers.merge! headers
                end

                it 'sends back unauthorized error(401)' do
                    post :create, valid_params
                    expect(response.status).to eq(401)
                end
            end #context 'when bid.user is same as current_user'

        end #context 'when an user sends a http POST request'
    end #describe '#create'

end
