import { Point } from '../@_models/point';

/**
 * Интерфейс для последних данных с датчиков
 */
export interface ISensorData {
    sensor_id: string;
    value: string | number | Point;
    measure: string;
    description: string
}
