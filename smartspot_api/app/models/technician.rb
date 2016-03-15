class Technician < ActiveRecord::Base
	has_secure_password
	has_many(:parkings)

	def login(given_password)
		hmac_secret = 'IL2MzjZ0Wvu0EGDZa2kyQkBVugUhLGbpk1pbJUPzavxHT7EbnsuNunolvJdtBOl'
		if authenticate(given_password)
			payload = {:username => self.username}
			return JWT.encode payload, hmac_secret, 'HS512'
		else
			raise 'Invalid password.'
		end
	end
end
