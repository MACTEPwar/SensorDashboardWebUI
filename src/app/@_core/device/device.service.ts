import { Injectable } from '@angular/core';
import { Device } from 'src/app/@_models/device';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { Sensor, DataOfSensor } from 'src/app/@_models/sensor';
import { SensorData } from 'src/app/@_models/ResponseModels/sensor-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/** Сервис для управления устройствами и их данными */
export class DeviceService {
  selectedDevice: BehaviorSubject<Device> = new BehaviorSubject<Device>(null);
  deviceList: Array<Device> = new Array<Device>();
  lastSensorData: Array<SensorData> = Array<SensorData>();
  lastPositions: Array<{ title: string, serial: string, datetime: number, position: { lat: string, lng: string } }> = new Array<{ title: string, serial: string, datetime: number, position: { lat: string, lng: string } }>();

  /** Содержит методы и свойства для управления устройствами и их данными */
  constructor(private apiService: ApiService) {

  }

  /**
   * Получает последние позиции всех устройств их вермя, и записывает в lastPositions 
   */
  getLastPositions() {
    this.apiService.SendComand<any>("api/devices/GetLastPositionFromDevices").subscribe(devices => {
      devices.forEach(device => {
        this.lastPositions.push({ 
          title: device.valueid.slice(0, device.valueid.indexOf('.')), 
          serial: device.valueid.slice(0, device.valueid.indexOf('.')), 
          datetime: device.datetime, 
          position: { 
            lat: device.value[0], 
            lng: device.value[1] 
          } 
        });
      });
    });
  }

  // async getDataFromSensor(serial: string, sensor_id: string, date_start: number = null, date_finish: number = null) {
  //   let res = await this.apiService.SendComand<any>(`api/devices/GetDataFromSensor/${serial}/${sensor_id}`, [{ "DateTimeBegin": date_start }, { "DateTimeFinish": date_finish }]).toPromise();
  //   return res;
  // }

  // getDataFromSensor2(serial: string, sensor_id: string, date_start: number = null, date_finish: number = null) {
  //   return this.apiService.SendComand<any>(`api/devices/GetDataFromSensor/${serial}/${sensor_id}`, [{ "DateTimeBegin": date_start }, { "DateTimeFinish": date_finish }]);
  // }

  /**
   * Получает список всех устройств и сохраняет их в devices
   */
  getDeviceList() {
    this.apiService.SendComand<any>("api/devices").subscribe(devices => {
      devices.forEach((device: Device) => {
        this.deviceList.push(device);
      });
    });
  }

  // getCountDataFromSensor(serial: string, sensor_id: string, date_start: number = null, date_finish: number = null) {
  //   return this.apiService.SendComand<any>(`api/devices/GetCountDataFromSensor/${serial}/${sensor_id}`, [{ "DateTimeBegin": date_start }, { "DateTimeFinish": date_finish }]);
  // }

  /**
   * Получает последние данные по пиндексу массива позций (по идексу позиции забирает дату, которую считает последней)
   * @param indexPos Индекс позиции 
   */
  getLastDataFromSensors(indexPos: number) {
    let finish_datetime = this.selectedDevice.getValue().sensors.filter(f => f.type === "position")[0].values[indexPos].datetime;
    this.apiService.SendComand<any>(`api/devices/GetLastDataFromSensors/${this.selectedDevice.getValue().serial}`, finish_datetime).subscribe(lastData => {
      this.lastSensorData = [];
      lastData.forEach((element: {
        sensor_id: string,
        value: string | number | { lat: number, lng: number },
        measure: string,
        description: string
      }) => {
        this.lastSensorData.push(element);
      });
    });
  }

  /**
   *  Устанавливает устройство как выбранное
   * @param device_id Индекс устройства с переменной devices
   */
  selectDevice(device_id) {
    let serial = this.lastPositions[device_id].serial;
    this.apiService.SendComand<Device>(`api/devices/test_get_devices/${serial}`).subscribe(
      devices => {
        let device: Device = devices[0];
        this.apiService.SendComand(`api/devices/test_get_sensors_for_device/${device.serial}/position`).subscribe((res: Sensor) => {
          device.sensors = new Array<Sensor>();
          device.sensors.push(res[0]);
          this.apiService.SendComand(`api/devices/test_get_data_for_sensor/${device.serial}`, device.sensors[0].sensor_id).subscribe((values: Array<DataOfSensor>) => {
            device.sensors[0].values = new Array<DataOfSensor>();
            device.sensors[0].values = values;
            this.selectedDevice.next(device);
            this.getLastDataFromSensors(this.selectedDevice.getValue().sensors.filter(f => f.type === "position")[0].values.length - 1);
          });
        });
      }
    )
  }
}
