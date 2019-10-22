import { Sensor } from './sensor';

export class Device {
    title: string;
    serial: string;
    sensors: Array<Sensor>;
    constructor(Title: string, Serial: string) {
        this.title = Title;
        this.serial = Serial;
        this.sensors = new Array<Sensor>();
    }
}
