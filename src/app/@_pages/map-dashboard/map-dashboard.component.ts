import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/@_core/device/device.service';
import { Sensor, DataOfSensor } from 'src/app/@_models/sensor';
import { Device } from 'src/app/@_models/device';
import { ApiService } from 'src/app/@_shared/api/api.service';

@Component({
  selector: 'app-map-dashboard',
  templateUrl: './map-dashboard.component.html',
  styleUrls: ['./map-dashboard.component.scss']
})
export class MapDashboardComponent implements OnInit {

  deviceListIsVisible: boolean = false;
  countSteps: number = 0;

  constructor(private deviceService: DeviceService, private api: ApiService) { }

  async ngOnInit() {
    let lastPos = await this.deviceService.getLastPositions();

    lastPos.forEach(device => {
      this.deviceService.lastPositions.push({ title: device.valueid.slice(0, device.valueid.indexOf('.')), serial: device.valueid.slice(0, device.valueid.indexOf('.')), datetime: device.datetime, position: { lat: device.value[0], lng: device.value[1] } });
    });

    this.deviceService.getDeviceList().subscribe(devices => {
      devices.forEach((device:Device) => {
        this.deviceService.deviceList.push(device);
      });
    });
  }

  async onSelectDevice(device_id) {
    this.deviceListIsVisible = false;
    let serial = this.deviceService.lastPositions[device_id].serial;

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
            this.deviceService.getLastDataFromSensors(this.countSteps);
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
    this.deviceService.getLastDataFromSensors(value);
  }
}
