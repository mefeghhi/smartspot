class CreateSpots < ActiveRecord::Migration
	def up
		create_table :spots do |t|
			t.references(:parking)

			t.string('label')
			t.integer('sensed_distance', :default => -2)
			t.string('sensor_id')
			
			t.timestamps(:null => false)
		end
		add_index(:spots, 'parking_id')
	end

	def down
		drop_table(:spots)
	end
end
