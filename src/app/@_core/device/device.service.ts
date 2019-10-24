import { Injectable } from '@angular/core';
import { Device } from 'src/app/@_models/device';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { Sensor } from 'src/app/@_models/sensor';
import { SensorData } from 'src/app/@_models/ResponseModels/sensor-data';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  selectedDevice: Device = null;
  deviceList: Array<Device> = new Array<Device>();
  lastSensorData: Array<SensorData> = Array<SensorData>();
  lastPositions: Array<{ title: string, serial: string, datetime: number, position: { lat: string, lng: string } }> = new Array<{ title: string, serial: string, datetime: number, position: { lat: string, lng: string } }>();

  constructor(private apiService: ApiService) {

  }

  async getLastPositions() {
    return await this.apiService.SendComand<any>("api/devices/GetLastPositionFromDevices").toPromise();
  }

  async getDataFromSensor(serial: string, sensor_id: string, date_start: number = null, date_finish: number = null) {
    let res = await this.apiService.SendComand<any>(`api/devices/GetDataFromSensor/${serial}/${sensor_id}`, [{ "DateTimeBegin": date_start }, { "DateTimeFinish": date_finish }]).toPromise();
    return res;
  }

  getDataFromSensor2(serial: string, sensor_id: string, date_start: number = null, date_finish: number = null) {
    return this.apiService.SendComand<any>(`api/devices/GetDataFromSensor/${serial}/${sensor_id}`, [{ "DateTimeBegin": date_start }, { "DateTimeFinish": date_finish }]);
  }

  getDeviceList() {
    return this.apiService.SendComand<any>("api/devices");
  }

  getCountDataFromSensor(serial: string, sensor_id: string, date_start: number = null, date_finish: number = null) {
    return this.apiService.SendComand<any>(`api/devices/GetCountDataFromSensor/${serial}/${sensor_id}`, [{ "DateTimeBegin": date_start }, { "DateTimeFinish": date_finish }]);
  }

  getLastDataFromSensors(indexPos: number) {
    let finish_datetime = this.selectedDevice.sensors.filter(f => f.type === "position")[0].values[indexPos].datetime;
    this.apiService.SendComand<any>(`api/devices/GetLastDataFromSensors/${this.selectedDevice.serial}`, finish_datetime).subscribe(lastData => {
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
}
