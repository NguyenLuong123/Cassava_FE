export class CustomizedParameters {
    acreage: number;
    fieldCapacity: number;
    distanceBetweenHole: number;
    irrigationDuration: number;
    distanceBetweenRow: number;
    dripRate: number;
    fertilizationLevel: number;
    scaleRain: number;
    numberOfHoles: number;
    autoIrrigation: boolean;

    constructor(name: string) {
        this.acreage = 50;
        this.fieldCapacity = 72;
        this.distanceBetweenHole = 30;
        this.irrigationDuration = 7;
        this.distanceBetweenRow = 100;
        this.dripRate = 1.6;
        this.fertilizationLevel = 100;
        this.scaleRain = 100;
        this.numberOfHoles = 8;
        this.autoIrrigation = true;
    }
}
class IrrigationInformation {
    time: string;
    amount: number;
    duration: number;

    constructor() {
    }
}
export class HistoryIrrigation {
    time: string;
    userName: string;
    amount: number | null; // Using union type to allow null values
    duration: number | null; // Using union type to allow null values

    constructor() {
        // Default constructor
    }
}
export class Field {
    fieldName: string;
    dAP: number;
    startTime: string;
    irrigationCheck: string;
    amountOfIrrigation: number;

    yields: number[];
    checkYieldDate: string;
    customized_parameters: CustomizedParameters;
    measured_data: string;
    startIrrigation: string;

    endIrrigation: string;
    _autoIrrigateTime: number = -1;
    irrigation_information: IrrigationInformation;
    historyIrrigation: HistoryIrrigation;

    constructor(nameField: string) {
        this.fieldName = nameField;
        this.startTime = new Date().toDateString();
        this.yields = [];
        this.customized_parameters = new CustomizedParameters('');
        this.irrigation_information = new IrrigationInformation();
        this.historyIrrigation = new HistoryIrrigation();
    }
}
