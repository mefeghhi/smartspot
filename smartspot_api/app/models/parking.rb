class Parking < ActiveRecord::Base
	belongs_to(:technician)
	has_many(:spots)

	def set_spots(spots)
		self.spots.destroy_all
		for spot in spots
			s = Spot.new(spot)
			s.set_random_id
			self.spots << s
		end
	end

	def single_serialize
		result = ParkingSerializer.new(self).serializable_hash
		result[:spots] = ActiveModel::ArraySerializer.new(self.spots).serializable_object
		return result.to_json
	end
end
