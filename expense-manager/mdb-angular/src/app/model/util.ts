import { Record } from './record';
import { Category } from './category';
export class Util {

    static getSum(records: Record[]) {
        let sum = 0;
        for(let i in records) {
            sum += records[i].val;
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
            for(let i=0; i<names.length; i++) {
                const name = names[i];
                if(categories[name].records == undefined) {
                    return;
                }
                let cRec = categories[name].records;
                for(let r in cRec) {
                    if(this.equalRecord(cRec[r],tRec[len])) {
                        transactions.records.splice(len, 1);
                        ;
                    }
                }
            }
        }
        return transactions;
    }
    
}