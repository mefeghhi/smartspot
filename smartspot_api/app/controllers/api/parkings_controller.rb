class Api::ParkingsController < ApplicationController
	before_action(:confirm_logged_in, {:only => [:create]})
	
	def create
		p = Parking.new(parking_params)
		p.technician = Technician.find_by_username(@username)
		p.set_spots(parking_spots['spots'])
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

	def parking_params
		params.permit(:name, :address, :description)
	end

	def parking_spots
 		params.permit(:spots => [:label, :status])
	end

end
