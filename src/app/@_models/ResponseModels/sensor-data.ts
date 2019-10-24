import { Point } from '../point';
import { ISensorData } from 'src/app/@_interfaces/isensor-data';
/**
 * Принятая информация с датчиека с сервера
 */
export class SensorData implements ISensorData {
    sensor_id: string;
    value: string | number | Point;
    measure: string;
    description: string

    /**
     * Создает новый объект информации с датчика
     */
    constructor();
    /**
     * Создает новый объект информации с датчика
     * @param Sensor_id Идентификатор датчика 
     * @param Value Последнее значение
     * @param Measure Еденица измерения
     * @param Description Описание на читабельном языке
     */
    constructor(Sensor_id: string,Value: string | number | Point,Measure: string,Description: string);
    constructor(Sensor_id?: string,Value?: string | number | Point,Measure?: string,Description?: string){
        this.description = Description;
        this.measure = Measure;
        this.sensor_id = Sensor_id;
        this.value = Value;
    }
}