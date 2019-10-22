import { Injectable } from '@angular/core';
import { Device } from 'src/app/@_models/device';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { Sensor } from 'src/app/@_models/sensor';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  selectedDevice:Device = null;

  constructor(private apiService:ApiService) {
  
  }

  async getLastPositions(){
    return await this.apiService.SendComand<any>("api/devices/GetLastPositionFromDevices").toPromise();
  }

  async getDataFromSensor(serial:string, sensor_id:string,date_start:number = null,date_finish:number=null){
    let res = await this.apiService.SendComand<any>(`api/devices/GetDataFromSensor/${serial}/${sensor_id}`,[{"DateTimeBegin":date_start},{"DateTimeFinish":date_finish}]).toPromise();
    return res;
  }

  getDataFromSensor2(serial:string, sensor_id:string,date_start:number = null,date_finish:number=null){
    return this.apiService.SendComand<any>(`api/devices/GetDataFromSensor/${serial}/${sensor_id}`,[{"DateTimeBegin":date_start},{"DateTimeFinish":date_finish}]);
  }

  getDeviceList(){
    return  this.apiService.SendComand<any>("api/devices");
  }

  getCountDataFromSensor(serial:string, sensor_id:string,date_start:number = null,date_finish:number=null){
    return this.apiService.SendComand<any>(`api/devices/GetCountDataFromSensor/${serial}/${sensor_id}`,[{"DateTimeBegin":date_start},{"DateTimeFinish":date_finish}]);
  }

  getLastDataFromSensor(datetime:number,serial:string){
    return this.apiService.SendComand<any>(`api/devices/GetLastDataFromSensors/${serial}`,datetime);
  }
}
