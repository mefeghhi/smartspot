class ApplicationController < ActionController::API
	include ActionController::Serialization

	before_filter :initialize_hmac

	@username
	@hmac_secret
	
	private
	
	def initialize_hmac
		@hmac_secret = 'IL2MzjZ0Wvu0EGDZa2kyQkBVugUhLGbpk1pbJUPzavxHT7EbnsuNunolvJdtBOl'
	end

	def check_logged_in
		token = get_authorization_token
		if (token.nil?)
			@username = nil
			return false
		end
		begin
			decoded_token = JWT.decode(token, @hmac_secret, true, {:algorithm => 'HS512'})
			@username = decoded_token[0]['username']
			return true
		rescue Exception => e
		 	render(:nothing => true, :status => 401)
			return false
		end
	end

	def check_logged_in_manually(token)
		if (token.nil?)
			@username = nil
			return false
		end
		begin
			decoded_token = JWT.decode(token, @hmac_secret, true, {:algorithm => 'HS512'})
			@username = decoded_token[0]['username']
			return true
		rescue Exception => e
			return false
		end
	end

	def confirm_logged_in
		token = get_authorization_token
		if (token.nil?)
			@username = nil
			render(:nothing => true, :status => 401)
		 	return false
		end
		begin
			decoded_token = JWT.decode(token, @hmac_secret, true, {:algorithm => 'HS512'})
			@username = decoded_token[0]['username']
			return true
		rescue Exception => e
		 	render(:nothing => true, :status => 401)
			return false
		end
	end

	def get_authorization_token
		token_header = request.headers['Authorization']
		if (token_header.nil?)
		 		return nil
		else
			return token_header[7..-1]
		end
	end
end
