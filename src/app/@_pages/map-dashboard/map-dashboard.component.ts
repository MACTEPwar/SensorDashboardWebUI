import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/@_core/device/device.service';
import { last } from 'rxjs/operators';
import { google } from '@agm/core/services/google-maps-types';
import { Sensor, DataOfSensor } from 'src/app/@_models/sensor';
import { SensorData } from 'src/app/@_models/ResponseModels/sensor-data';
import { Device } from 'src/app/@_models/device';
import { ApiService } from 'src/app/@_shared/api/api.service';

@Component({
  selector: 'app-map-dashboard',
  templateUrl: './map-dashboard.component.html',
  styleUrls: ['./map-dashboard.component.scss']
})
export class MapDashboardComponent implements OnInit {

  deviceListIsVisible: boolean = false;
  deviceList: Array<any> = new Array<any>();
  countSteps: number = 0;
  lastSensorData: Array<{
    sensor_id:string,
    value:string|number| { lat: number, lng: number },
    measure:string,
    description:string
  }> = new Array<{
    sensor_id:string,
    value:string|number| { lat: number, lng: number },
    measure:string,
    description:string
  }>();
  lastMarkerPosition = null;

  constructor(private deviceService: DeviceService, private api: ApiService) { }

  lastPositions: Array<{ title: string, serial: string, datetime: number, position: { lat: string, lng: string } }> = new Array<{ title: string, serial: string, datetime: number, position: { lat: string, lng: string } }>();


  async ngOnInit() {
    let lastPos = await this.deviceService.getLastPositions();

    lastPos.forEach(device => {
      this.lastPositions.push({ title: device.valueid.slice(0, device.valueid.indexOf('.')), serial: device.valueid.slice(0, device.valueid.indexOf('.')), datetime: device.datetime, position: { lat: device.value[0], lng: device.value[1] } });
    });

    this.deviceService.getDeviceList().subscribe(res => {
      res.forEach(element => {
        this.deviceList.push(element)
      });
    });

    // console.log(this.lastPositions);
    // console.log(this.deviceList);
  }

  async onSelectDevice(device_id) {
    this.deviceListIsVisible = false;
    let serial = this.lastPositions[device_id].serial;

    this.api.SendComand<Device>(`api/devices/test_get_devices/${serial}`).subscribe(
      devices => {
        let device: Device = devices[0];
        this.api.SendComand(`api/devices/test_get_sensors_for_device/${device.serial}/position`).subscribe((res: Sensor) => {
          device.sensors = new Array<Sensor>();
          device.sensors.push(res[0]);
          this.api.SendComand(`api/devices/test_get_data_for_sensor/${device.serial}`, device.sensors[0].sensor_id).subscribe((values: Array<DataOfSensor>) => {
            device.sensors[0].values = new Array<DataOfSensor>();
            device.sensors[0].values = values;
            this.deviceService.selectedDevice = device;
            this.countSteps = this.deviceService.selectedDevice.sensors.filter(f => f.type === "position")[0].values.length - 1;
            this.getLastDataFromSensors(this.countSteps);
            // this.deviceService.getCountDataFromSensor(serial, "position").subscribe(res => {
            //   this.countSteps = res - 1;
            //   this.getLastDataFromSensors(this.countSteps);
            // });
            console.log(this.deviceService.selectedDevice)
          });
        });
      }
    );

    // this.deviceService.getDataFromSensor2(serial, "position").subscribe((res:Array<SensorData>) => {

    //   this.currentRoad = new Device(res[0].valueid.slice(0, res[0].valueid.indexOf('.')),res[0].valueid.slice(0, res[0].valueid.indexOf('.')));
    //   res.forEach(device => {
    //     //console.log(device.valueid);
    //     if (parseFloat(device.value[0]) > 0.0 || parseFloat(device.value[1]) > 0.0) {
    //       this.currentRoad["asd"] = "123";
    //       //this.currentRoad.Sensors.push(new Sensor(device.datetime,device.valueid.slice(device.valueid.indexOf('.')) + 1,device.value));
    //       // this.currentRoad.title = device.valueid.slice(0, device.valueid.indexOf('.'));
    //       // this.currentRoad.serial = device.valueid.slice(0, device.valueid.indexOf('.'));
    //       // this.currentRoad.datetime = device.datetime;
    //       // this.currentRoad.positions.push({ lat: parseFloat(device.value[0]), lng: parseFloat(device.value[1]) } );
    //     }
    //   });
    //   this.deviceService.getCountDataFromSensor(serial, "position").subscribe(res => {
    //     this.countSteps = res - 1;
    //     this.getLastDataFromSensors(this.countSteps);
    //   });
    //   this.selectedDeviceSerial = serial;
    //   console.log(this.currentRoad);
    // });

  }

  toggleDeviceList() {

    this.deviceListIsVisible = !this.deviceListIsVisible;
  }

  onChangeRangeHistory(value: number) {
    this.getLastDataFromSensors(value);
  }

  getLastDataFromSensors(indexPos: number) {
    //console.log("change");
    // this.deviceService.getDataFromSensor2(this.selectedDeviceSerial, "position").subscribe(res => {
    //   let finish_datetime = res[indexPos].datetime;
    //   this.deviceService.getLastDataFromSensor(finish_datetime, this.selectedDeviceSerial).subscribe(result => {
    //     this.lastSensorData = [];
    //     result.forEach(element => {
    //       this.lastSensorData.push(new Sensor(element.datetime, element.valueid.slice(element.valueid.indexOf(".") + 1), element.value));
    //     });
    //     let temp_pos = this.lastSensorData.filter(de => de.SensorId === "position")[0].Values[0];
    //     this.lastMarkerPosition = {lat: temp_pos[0], lng: temp_pos[1]};
    //     //console.log(this.lastSensorData.filter(de => de.SensorId === "position"));
    //   });
    // });
    let finish_datetime = this.deviceService.selectedDevice.sensors.filter(f => f.type === "position")[0].values[indexPos].datetime;
       this.deviceService.getLastDataFromSensor(finish_datetime, this.deviceService.selectedDevice.serial).subscribe(result => {
        this.lastSensorData = [];
        result.forEach((element:{
          sensor_id:string,
          value:string|number| { lat: number, lng: number },
          measure:string,
          description:string
        }) => {
          //let sensor:Sensor = new Sensor()
          //this.deviceService.selectedDevice.sensors.push()
          
          this.lastSensorData.push(element);
        });
        //console.log(this.lastSensorData);
        // let temp_pos = this.lastSensorData.filter(de => de.SensorId === "position")[0].Values[0];
        // this.lastMarkerPosition = {lat: temp_pos[0], lng: temp_pos[1]};
        //console.log(this.lastSensorData.filter(de => de.SensorId === "position"));
      });
  }

  getTest() {
    let lat = 48.4671;
    let lng = 35.0163;
    //setInterval(() => {lat+=0.1;lng+=0.1;},1000);
    return { lat: lat, lng: lng };
  }

}
