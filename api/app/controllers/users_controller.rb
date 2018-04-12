class UsersController < ApplicationController

    def create
        user = User.new user_params
        render json: user if user.save!
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

end
