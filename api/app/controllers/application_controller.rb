class ApplicationController < ActionController::API
    # skip_before_action :verify_authenticity_token

    rescue_from StandardError, with: :standard_error
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    rescue_from ActiveRecord::RangeError, with: :invalid_range

    def not_found
        errors = { errors: [{ type: 'Not Found'}] }
        render json: errors, status: :not_found
    end
    
    
    private
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
        
        def authenticate_user!
            unless current_user.present?
                unauthorized_user
            end
        end
        
        def unauthorized_user
            render(json: { errors: [ { type: 'unauthorized',
                message: 'Not authorized'
                } ]
            },
            status: :unauthorized
            )
        end
        
        # def conflict
        #     errors = { errors: [{ type: 'Wrong Input Data'}]}
        #     render(json: errors, status: :conflict)
        # end
        # 👆This custom errors can only be implemented when there is no crash occured
        # For example, auction.save 👈 this doesn't return any error when validation fails,
        # so we can implement our custom error conflict, yet auction.save! 👈 this crashes and returns error
        # when validation fails, so it will automatically send back an record invalid error to client.
        
        protected
        
        def record_not_found(error)
            errors = { errors: [ { type: error.class.to_s,
                message: error.message 
            } 
        ]
                        }
            render json: errors, status: :not_found

        end
        
        def standard_error(error)
            logger.error "#{error.class.to_s}: #{error.message}"
            # logger.error error.backtrace.join("\n") 
            errors = { errors: [ 
                        { type: error.class.to_s,
                          message: error.message
                        }
                       ]
                    }
            render json: errors, status: :internal_server_error
        end

        def invalid_record(error)
            record = error.record
            errors = record.errors.map do |field, message|
                logger.error "#{field}: #{message} \n"
                { 
                    type: error.class.to_s,
                    record_type: record.class.to_s,
                    field: field,
                    message: message
                }
            end
            render(
                json: { errors: errors},
                 status: :unprocessable_entity
                 )
              
        end

        def invalid_range(error)
                logger.error "#{error.message} \n"
            errors = [{ 
                    type: error.class.to_s,
                    message: "A field with precision 10, scale 2 must round to an absolute value less than 10^8."
                }]
            render(
                json: { errors: errors},
                 status: :unprocessable_entity
                 )      
        end

        # def syntax_error(error)
        #     errors = [ { type: error.class.to_s,
        #                  message: error.message
        #                 }
        #             ]
        #     render(json: { errors: errors}, status: :internal_server_error)
        # end
        # 👆 I tried to rescue syntax error, but it didn't work since syntax error raises
        # much earlier than even the controller is loaded.
        # rescuing exeptions in system level is not recommended anyways, so I won't
        # research further for now. ( Most of the time, StandardError is the bottom level 
        # of application error class that needs to be rescued)
end
