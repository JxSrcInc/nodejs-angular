import {Record} from './record';
export class Category {
    records: Record[] ;
    name: string;
//    lastYearSummary: number;
    lastRecords: Record[];

    /*
    constructor(records: Record[], name: string) {
        this.records = records;
        this.name = name;
    }
    */
    constructor(records: Record[], name: string, lastRecords: Record[]) {
        this.records = records;
        this.name = name;
        this.lastRecords = lastRecords;
    }
}