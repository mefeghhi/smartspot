class Technician < ActiveRecord::Base
	has_many(:parkings)
end
