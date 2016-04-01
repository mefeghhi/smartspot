require 'securerandom'

class Spot < ActiveRecord::Base
	belongs_to(:parking)

	def set_random_id
		self.sensor_id = SecureRandom.urlsafe_base64(16)
	end

	def status
		if self.sensed_distance < 0
			return -1
		elsif self.sensed_distance < 20
			return 0
		elsif self.sensed_distance >= 20
			return 1
		end
	end
end
