import {Record} from './record';
export class Category {
    records: Record[] ;
    name: string;
    constructor(records: Record[], name: string) {
        this.records = records;
        this.name = name;
    }
}