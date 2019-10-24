import { Sensor } from './sensor';
import { IDevice } from '../@_interfaces/idevice';
/**
 * Класс устройства
 */
export class Device implements IDevice {
    title: string;
    serial: string;
    sensors: Array<Sensor>;
    /**
     * Создает новое устройство
     */
    constructor();
    /**
     * Создает новое устройство
     * @param Title Название
     * @param Serial Серийный номер
     * @param Sensors Перечень датчиков
     */
    constructor(Title: string, Serial: string,Sensors?:Array<Sensor>);
    constructor(Title?: string, Serial?: string,Sensors?:Array<Sensor>) {
        this.title = Title;
        this.serial = Serial;
        this.sensors = Sensors || new Array<Sensor>();
    }
}
