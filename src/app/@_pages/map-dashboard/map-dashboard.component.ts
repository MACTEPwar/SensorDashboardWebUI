import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/@_core/device/device.service';

@Component({
  selector: 'app-map-dashboard',
  templateUrl: './map-dashboard.component.html',
  styleUrls: ['./map-dashboard.component.scss']
})
/** Компонент-страничка MapDashboardComponent */
export class MapDashboardComponent implements OnInit {

  deviceListIsVisible: boolean = false;
  countSteps: number = 0;

  constructor(private deviceService: DeviceService) { 
    this.deviceService.selectedDevice.subscribe(selectedDevice => {
      if (selectedDevice){
        this.countSteps = selectedDevice.sensors.filter(f => f.type === "position")[0].values.length - 1;
      }
    });
  }

  ngOnInit() {
    this.deviceService.getLastPositions();
    this.deviceService.getDeviceList();
  }

  /**
   * Происходит при выборе устройства
   * @param device_id Индекс устройства
   */
  onSelectDevice(device_id) {
    this.deviceListIsVisible = false;
    this.deviceService.selectDevice(device_id);
  }

  /**
   * Показывает/скрывает список устройств
   */
  toggleDeviceList() {
    this.deviceListIsVisible = !this.deviceListIsVisible;
  }

  /**
   * Происходит при изменении горизонтального range input
   * @param value Значение горизонтального range input
   */
  onChangeRangeHistory(value: number) {
    this.deviceService.getLastDataFromSensors(value);
  }
}
