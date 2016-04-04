require 'securerandom'

class Parking < ActiveRecord::Base
    belongs_to(:technician)
    has_many(:spots)

    def set_key()
        self.key = SecureRandom.urlsafe_base64(64)
    end

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

    def update_sensors(key, updated_sensors)
        if self.key == key
            for sensor in updated_sensors
                update_sensor(sensor['id'], sensor['value'])
            end
            return true
        else
            return false
        end
    end

    def get_main_driver_code
        code = "import RPi.GPIO as GPIO\n"
        code += "import random\n"
        code += "import time\n"
        code += "import requests\n"
        code += "\n"
        code += "GPIO.cleanup()\n"
        code += "GPIO.setmode(GPIO.BCM)\n"
        code += "SEL = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]\n"
        code += "TRIG = 12\n"
        code += "ECHO = 13\n"
        code += "for pin in SEL:\n"
        code += "    GPIO.setup(pin, GPIO.OUT)\n"
        code += "GPIO.setup(TRIG, GPIO.OUT)\n"
        code += "GPIO.setup(ECHO, GPIO.IN)\n"
        code += "\n"
        code += "GPIO.output(TRIG, False)\n"
        code += "time.sleep(1)\n"
        code += "\n"
        code += "def to_bool_array(i):\n"
        code += "    str = bin(i)[2:]\n"
        code += "    if len(str) < 10:\n"
        code += "        str = (10 - len(str)) * '0' + str\n"
        code += "    result = []\n"
        code += "    m = {\n"
        code += "        '1': True,\n"
        code += "        '0': False\n"
        code += "    }\n"
        code += "    for c in str:\n"
        code += "        result.append(m[c])\n"
        code += "    return result\n"
        code += "\n"
        code += "def select_sensor(i):\n"
        code += "    value_array = to_bool_array(i)\n"
        code += "    for i in range(0, len(SEL)):\n"
        code += "        pin = SEL[i]\n"
        code += "        value = value_array[len(SEL) - 1 - i]\n"
        code += "        GPIO.output(pin, value)\n"
        code += "\n"
        code += "def trigger_pulse():\n"
        code += "    GPIO.output(TRIG, True)\n"
        code += "    time.sleep(0.00001)\n"
        code += "    GPIO.output(TRIG, False)\n"
        code += "\n"
        code += "def read_sensor(i):\n"
        code += "    select_sensor(i)\n"
        code += "    run = 0\n"
        code += "    while GPIO.input(ECHO) == 1:\n"
        code += "        continue\n"
        code += "    pulse_start = time.time()\n"
        code += "    trigger_pulse()\n"
        code += "    while GPIO.input(ECHO) == 0 and run < 500:\n"
        code += "        pulse_start = time.time()\n"
        code += "        run += 1\n"
        code += "    if run == 500:\n"
        code += "        return -1\n"
        code += "    while GPIO.input(ECHO) == 1:\n"
        code += "        pulse_end = time.time()\n"
        code += "    pulse_duration = pulse_end - pulse_start\n"
        code += "    return round(pulse_duration * 17150, 2)\n"
        code += "\n"
        code += "REQUEST_PATH = 'http://199.116.235.151:3000" + "/api/parkings/" + self.id.to_s + "/update_sensors'\n"
        code += "PARKING_ID = " + self.id.to_s + "\n"
        code += "KEY = '" + self.key.to_s + "'\n"
        sensor_ids = []
        for spot in spots
            sensor_ids << spot.sensor_id
        end
        code += "SENSOR_IDS = [" + sensor_ids.inspect.to_s[1..-2].gsub('"', "'") + "]\n"
        code += "SENSORS = []\n"
        code += "for ID in SENSOR_IDS:\n"
        code += "    SENSORS.append({\n"
        code += "        'id': ID,\n"
        code += "        'value': -2\n"
        code += "        })\n"
        code += "\n"
        code += "DATA = {\n"
        code += "    'parking_id': PARKING_ID,\n"
        code += "    'key': KEY,\n"
        code += "    'updated_sensors': []   \n"
        code += "}\n"
        code += "while True:\n"
        code += "    DATA['updated_sensors'] = []\n"
        code += "    for i in range(0, len(SENSOR_IDS)):\n"
        code += "        new_value = read_sensor(i)\n"
        code += "        old_value = SENSORS[i]['value']\n"
        code += "        if old_value == -2 or abs(new_value - old_value) > 10:\n"
        code += "            SENSORS[i]['value'] = new_value\n"
        code += "            DATA['updated_sensors'].append(SENSORS[i])\n"
        code += "            \n"
        code += "    if len(DATA['updated_sensors']) > 0:\n"
        code += "        print 'Sending update for', len(DATA['updated_sensors']), 'sensors'\n"
        code += "        try:\n"
        code += "            if requests.post(REQUEST_PATH, json = DATA).ok:\n"
        code += "                print 'Response: OK'\n"
        code += "            else:\n"
        code += "                print 'Response: Error'\n"
        code += "         except:\n"
        code += "             print 'Connection Error...'\n"
        code += "    else:\n"
        code += "        print 'No update detected'\n"
        return code
    end

    def get_test_driver_code
        code = "import random\n"
        code += "import time\n"
        code += "import requests\n"
        code += "\n"
        code += "REQUEST_PATH = 'http://199.116.235.151:3000" + "/api/parkings/" + self.id.to_s + "/update_sensors'\n"
        code += "PARKING_ID = " + self.id.to_s + "\n"
        code += "KEY = '" + self.key.to_s + "'\n"
        sensor_ids = []
        for spot in spots
            sensor_ids << spot.sensor_id
        end
        code += "SENSOR_IDS = [" + sensor_ids.inspect.to_s[1..-2].gsub('"', "'") + "]\n"
        code += "SENSORS = []\n"
        code += "for ID in SENSOR_IDS:\n"
        code += "    SENSORS.append({\n"
        code += "        'id': ID,\n"
        code += "        'value': -2\n"
        code += "        })\n"
        code += "\n"
        code += "DATA = {\n"
        code += "    'parking_id': PARKING_ID,\n"
        code += "    'key': KEY,\n"
        code += "    'updated_sensors': []   \n"
        code += "}\n"
        code += "while True:\n"
        code += "    DATA['updated_sensors'] = []\n"
        code += "    for i in range(0, len(SENSOR_IDS)):\n"
        code += "        new_value = random.randint(0, 110)\n"
        code += "        old_value = SENSORS[i]['value']\n"
        code += "        if old_value == -2 or abs(new_value - old_value) > 10:\n"
        code += "            SENSORS[i]['value'] = new_value\n"
        code += "            DATA['updated_sensors'].append(SENSORS[i])\n"
        code += "            \n"
        code += "    if len(DATA['updated_sensors']) > 0:\n"
        code += "        print 'Sending update for', len(DATA['updated_sensors']), 'sensors'\n"
        code += "        try:\n"
        code += "            if requests.post(REQUEST_PATH, json = DATA).ok:\n"
        code += "                print 'Response: OK'\n"
        code += "            else:\n"
        code += "                print 'Response: Error'\n"
        code += "        except:\n"
        code += "            print 'Connection Error...'\n"
        code += "    else:\n"
        code += "        print 'No update detected\n"
        code += "    time.sleep(2)\n"
        return code
    end

    private
    def update_sensor(sensor_id, sensor_value)
        for spot in self.spots
            if spot.sensor_id == sensor_id
                spot.sensed_distance = sensor_value
                spot.save
                break
            end
        end
    end
end
