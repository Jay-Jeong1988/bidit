class UsersController < ApplicationController

    def create
        user = User.new user_params
        if user.save
            render json: user
        else
            head :conflict
        end
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

end
