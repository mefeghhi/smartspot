class Api::ParkingsController < ApplicationController
	before_action(:confirm_logged_in, {:only => [:create]})
	
	def create
		p = Parking.new(parking_params)
		p.technician = Technician.find_by_username(@username)
		p.set_spots(parking_spots['spots'])
		p.set_key()
		p.save
		render(:nothing => true, :status => 200)
	end

	def index
		render(:json => Parking.all, :status => 200)
	end
	
	def show
		found = Parking.find_by_id(params[:id])
		render(:json => found.single_serialize, :status => 200)
	end

	def update
		found = Parking.find_by_id(params[:id])
		found.update_attributes(parking_params)
		found.set_spots(parking_spots['spots'])
		render(:nothing => true, :status => 200)
	end

	def destroy
		found = Parking.find_by_id(params[:id])
		found.spots.destroy_all
		found.destroy
		render(:nothing => true, :status => 200)
	end

	def download_main_driver
		found = Parking.find_by_id(params[:id])
		if check_logged_in_manually(params[:token])
			send_data found.get_main_driver_code,  :filename => "main_driver.py"
		else
			render(:nothing => true, :status => 401)
		end
	end

	def download_test_driver
		found = Parking.find_by_id(params[:id])
		if check_logged_in_manually(params[:token])
			send_data found.get_test_driver_code,  :filename => "test_driver.py"
		else
			render(:nothing => true, :status => 401)
		end
	end

	def update_sensors
		found = Parking.find_by_id(update_sensors_params['parking_id'])
		if found.update_sensors(update_sensors_params[:key], update_sensors_params[:updated_sensors])
			render(:nothing => true, :status => 200)
		else
			render(:nothing => true, :status => 401)
		end
	end

	def parking_params
		params.permit(:name, :address, :latitude, :longitude, :description)
	end

	def parking_spots
 		params.permit(:spots => [:label])
	end

	def update_sensors_params
		params.permit(:parking_id, :key, :updated_sensors => [:id, :value])
	end

end
