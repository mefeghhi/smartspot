class SpotSerializer < ActiveModel::Serializer
  attributes :id, :sensor_id, :label, :status

  # def status
  # 	return object.status
  # end
end
