import { Record } from './record';
import { Category } from './category';
export class Util {

    static getSum(records: Record[]) {
        let sum = 0;
        for(let i in records) {
            if(records[i].val) {
                sum += records[i].val;
            }
        }
        return sum;
    }

    static getCategorySum(category: Category) {
        return this.getSum(category.records);
    }

    static equalRecord(r1: Record, r2: Record) {
        if(r1.date != r2.date) {
            return false;
        } else
        if(r1.merchant != r2.merchant) {
            return false;
        } else
        if(r1.note != r2.note) {
            return false;
        } else
        if(r1.val != r2.val) {
            return false;
        } else {
            return true;
        }
    }

    static merge(categories:{}, transactions: Category) {
        if(transactions.records.length == 0) {
            return;
        }
        let tRec = transactions.records;
        let names = Object.getOwnPropertyNames(categories);
        let len = transactions.records.length;
        while(len--) {
            let removed = false;
            for(let i=0; i<names.length && !removed; i++) {
                const name = names[i];
                if(categories[name].records == undefined) {
                    return;
                }
                let cRec = categories[name].records;
                for(let r in cRec) {
                    if(this.equalRecord(cRec[r],tRec[len])) {
                        transactions.records.splice(len, 1);
                        removed = true;
                        break;
                    }
                }
            }
        }
        return transactions;
    }
    static transferRecord(records: Record[]) {
        for(let i in records) {
            let record = records[i];
            /*
            let arr = record.date.split("-");
            if(arr[1].length == 1) {
                arr[1] = '0'+arr[1];
            }
            if(arr[2].length == 1) {
                arr[2] = '0'+arr[2];
            }
            record.date = arr[0]+'-'+arr[1]+'-'+arr[2];
            */
           record.date = this.transferDate(record.date);
        }
        return records;
    }
    static transferDate(date: string) {
        let arr = date.split("-");
        if(arr[1].length == 1) {
            arr[1] = '0'+arr[1];
        }
        if(arr[2].length == 1) {
            arr[2] = '0'+arr[2];
        }
        return arr[0]+'-'+arr[1]+'-'+arr[2];
    }
}