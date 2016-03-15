class Api::SessionsController < ApplicationController
	def create
		found = Technician.find_by_username(params[:username])
		if found.nil?
			render(:json => {:status => 'error', :message => 'User not found.'}, :status => 200)
		else 
			begin
				render(:json => {:status => 'success', :token => found.login(params[:password])}, :status => 200)
			rescue Exception => e
				render(:json => {:status => 'error', :message => 'Wrong password.'}, :status => 200)
			end
		end
	end
end
