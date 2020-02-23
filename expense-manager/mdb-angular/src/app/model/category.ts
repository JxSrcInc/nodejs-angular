import {Record} from './record';
import {AppConfig} from '../config';
export class Category {
    records: Record[] ;
    name: string;
    isResetExclude: boolean;
    constructor(records: Record[], name: string) {
        let appConfig = new AppConfig();
        this.records = records;
        this.name = name;
        for (let i in appConfig.resetExcludes) {
            let excludeCategrory = appConfig.resetExcludes[i];
            if(this.name.toLowerCase() == excludeCategrory.toLowerCase()) {
                this.isResetExclude = true;
            };
        }
        this.isResetExclude = false;
    }

}