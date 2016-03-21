class SpotSerializer < ActiveModel::Serializer
  attributes :id, :sensor_id, :label, :sensed_distance, :status
end
