import { IDataOfSensor } from '../@_interfaces/idata-of-sensor';
import { ISensor } from '../@_interfaces/isensor';
/**
 * Содержит информацию о датчике
 */
export class Sensor implements ISensor {
    sensor_id:string;
    measure:string;
    type: string;
    description:string;
    values:Array<DataOfSensor> = new Array<DataOfSensor>();
    /**
     * Создает новый датчик
     * @param SensorId Идентификатор датчика
     * @param Type Тип датчика
     * @param Measure Единицы измекрения
     * @param Description Описание в читабельном виде
     * @param Value Значения
     */
    constructor(SensorId:string,Type:string,Measure:string,Description:string,Value:Array<DataOfSensor> = new Array<DataOfSensor>()){
        this.sensor_id = SensorId;
        this.values =Value;
        this.measure = Measure;
        this.type = Type;
        this.description = Description;
    }
}

/**
 * Содержит значения с датчика
 */
export class DataOfSensor implements IDataOfSensor{
    datetime:number;
    value:any;
    /**
     * Создает новое значение датчика
     * @param Datetime времея снятия значения
     * @param Value значение с датчика
     */
    constructor(Datetime:number, Value:any){
        this.datetime = Datetime;
        this.value = Value;
    }
}
