import { Pipe, PipeTransform } from '@angular/core';
import { Device } from '../@_models/device';

@Pipe({
  name: 'valuesFromDevice'
})
export class ValuesFromDevicePipe implements PipeTransform {

  transform(value: Device, sensor_id?: string): Array<number | string | { lng: number, lat: number }> {
    let res = value.sensors.filter(e => {
      return e.sensor_id === sensor_id;
    })[0].values.map(v => {
      if (v.value.length > 1 && v.value instanceof Array){
        return { lat: parseFloat(v.value[0]), lng: parseFloat(v.value[1]) }
      }
      else {
        return v.value
      }
    });
    return res;
  }

}
