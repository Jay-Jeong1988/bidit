require 'rails_helper'

RSpec.describe TokensController, type: :controller do

    def user
        user = User.new({first_name: 'jaja',
        last_name: 'hahah', 
        email: 'alal@alal.com', 
        password: 'akakak'})
    end           
    
    describe '#create' do
        context 'When an user send a http_POST_request (sign in)' do
            before do
                user.save
            end
            
            context 'with valid authentication' do
                
                def valid_request
                    post :create, params: { email: user.email, password: user.password }
                end

                it 'creates a token with jwt and send it back' do
                    valid_request
                    expect(response.status).to eq(200)
                end
            end
            
            context 'with invalid authentication' do

                def invalid_request
                    post :create, params: { email: user.email, password: 'wrong' }
                end

                it 'send back an error(not_found:404)' do
                    invalid_request
                    expect(response.status).to eq(404)
                end
            end
        end
    end 
end
