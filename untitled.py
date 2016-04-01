import random
import time
import requests

REQUEST_PATH = "http://localhost:3000/api/parkings/:id/update_sensors"
PARKING_ID = 1
KEY = 'aKhor3e16o3AN8JQHuXw7kk6qlCawEZBY2ewwz_2QOkw4hGaLlAuy2ADcEPC8ejZvf3NEcQXsE4_pT58n2xZ_w'
SENSOR_IDS = ['wUuIVi20WywmgZQzarTnzw', 'ufoOrtTvp-pooKapV16mpw', '9M0g7w14Cyn2p5zT4DQEWQ', '4UuHxO-quraC5ruXh0KdfQ', 'PnUU-VzIqBWUYjYpnvBeuA', '2ehQnsDIAyTHEC4o4WGtNw', 'miSfYJRHPkg4VPGx-rM-QQ', 'ro6Y3KR-JtW9xMxhinUECw']
SENSORS = []
for ID in SENSOR_IDS:
    SENSORS.append({
        'id': ID,
        'value': -1
        })

DATA = {
    'parking_id': PARKING_ID,
    'key': KEY,
    'updated_sensors': []   
}
while True:
    DATA['updated_sensors'] = []
    for i in range(0, len(SENSOR_IDS)):
        new_value = random.randint(0, 110)
        old_value = SENSORS[i]['value']
        should_send = False
        if new_value == -1 or old_value == -1 or abs(new_value - old_value) > 10:
            should_send = True
            SENSORS[i]['value'] = new_value
            DATA['updated_sensors'].append(SENSORS[i])
            
    print "Sending update for", len(DATA['updated_sensors']), "sensors"
    try:
        if requests.post(REQUEST_PATH, json = DATA).ok:
            print "OK"
    except:
        print "Connection Error..."
    time.sleep(2)
