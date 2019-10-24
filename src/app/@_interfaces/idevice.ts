import { ISensor } from './isensor';
/**
 * Интерфейс для устройства
 */
export interface IDevice {
    title: string;
    serial: string;
    sensors: Array<ISensor>;
}
