class ApplicationController < ActionController::API
    # skip_before_action :verify_authenticity_token

    def not_found
        errors = { errors: [{ type: 'Not Found'}] }
        render json: errors, status: :not_found
    end

    def current_user
        token = request.headers["AUTHORIZATION"]
    
        # The decoded token will be array containing
        # the payload and the JWT header in that order.
        begin
            payload = JWT.decode(
            token,
            Rails.application.secrets.secret_key_base
            )&.first
    
            # To get a value from payload, make sure to use
            # strings to access the keys. The payload's hash's
            # keys are all strings and not symbols.
            @user ||= User.find_by_id(payload["id"])
        rescue JWT::DecodeError => error
            nil
        end
    end
    
    private
        def authenticate_user!
            head :unauthorized unless current_user.present?
        end
end
