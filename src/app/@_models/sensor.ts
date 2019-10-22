export class Sensor {
    sensor_id:string;
    measure:string;
    type: string;
    description:string;
    values:Array<DataOfSensor> = new Array<DataOfSensor>();
    
    constructor(SensorId:string,Type:string,Measure:string,Description:string,Value:Array<DataOfSensor> = new Array<DataOfSensor>()){
        this.sensor_id = SensorId;
        this.values =Value;
        this.measure = Measure;
        this.type = Type;
        this.description = Description;
    }
}

export class DataOfSensor{
    datetime:number;
    value:any;

    constructor(Datetime:number, Value:any){
        this.datetime = Datetime;
        this.value = Value;
    }
}
