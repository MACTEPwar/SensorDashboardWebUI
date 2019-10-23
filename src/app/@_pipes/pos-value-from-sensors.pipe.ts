import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posValueFromSensors'
})
export class PosValueFromSensorsPipe implements PipeTransform {

  transform(value: Array<{
    sensor_id:string,
    value:string|number| { lat: number, lng: number },
    measure:string,
    description:string
  }>,index?:number):number {
    
    let sensors = value.filter(sensor => (<any>sensor).type === "position");
    if (sensors !== null && sensors.length > 0) {
      let sensor = sensors[0];
      if (sensor !== null) {
        return sensor.value[index];
      }
    }
    return;
  }

}
