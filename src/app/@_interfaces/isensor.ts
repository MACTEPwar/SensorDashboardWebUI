import { IDataOfSensor } from './idata-of-sensor';
/**
 * Интерфейс информации о датчике
 */
export interface ISensor {
    sensor_id:string;
    measure:string;
    type: string;
    description:string;
    values:Array<IDataOfSensor>;
}
