/**
 * Класс позиции
 */
export class Point {
    lat:number;
    lng:number;

    /**
     * Создает класс позиции с широтой и долготой
     * @param latitude широта
     * @param longitude долгота
     */
    constructor(latitude:number,longitude:number){
        this.lat = latitude;
        this.lng = longitude;
    }
}
