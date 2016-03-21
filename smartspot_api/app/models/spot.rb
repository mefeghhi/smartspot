require 'securerandom'

class Spot < ActiveRecord::Base
	belongs_to(:parking)

	def set_random_id
		self.sensor_id = SecureRandom.urlsafe_base64(16)
	end
end
