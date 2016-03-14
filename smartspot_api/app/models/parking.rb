class Parking < ActiveRecord::Base
	belongs_to(:technician)
	has_many(:spots)
end
