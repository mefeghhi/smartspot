class CreateTechnicians < ActiveRecord::Migration
	def up
		create_table :technicians do |t|
			t.string('username')
			t.string('password_digest')
			
			t.timestamps(:null => false)
		end
	end

	def down
		drop_table(:technicians)
	end
end
