class Util {
    static loadTransaction(filename) {
        const csv = require('csv-parser')
        const fs = require('fs')
        const results = [];
        var fileContents = fs.readFileSync(filename);
        var lines = fileContents.toString().split('\r\n');

        for (var i = 1; i < lines.length; i++) {
            let ele = lines[i].toString().split(',');
            if (ele.length == 5) {
                let val;
                if (ele[1].length == 0) {
                    // Income
                    val = parseFloat(ele[2]);
                } else {
                    val = -parseFloat(ele[1]);
                }
                const date = new Date(ele[0]);
                let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                results.push({ 'date': formatted_date, 'val': val, 'merchant': ele[3], 'note': ele[4] });
            }
        }
        return results;
    };
    static convertToFloat(val) {
        return val.substring(1).replace(",", "");
    }
    static loadRental_13300(filename) {
        return this.loadRental(filename);
    }
    static loadRental_9899(filename) {
        return this.loadRental(filename, 2);
    }
    static loadRental_9860(filename) {
        return this.loadRental(filename, 2);
    }

    static loadRental(filename, divid = 1) {
        const csv = require('csv-parser')
        const fs = require('fs')
        const results = [];
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => {
                if (data.Date && (data.Expense || data.Revenue)) {
                    let val;
                    if (data.Expense.length == 0) {
                        // Income
                        val = parseFloat(this.convertToFloat(data.Revenue));
                    } else {
                        val = -parseFloat(this.convertToFloat(data.Expense));
                    }
                    const date = new Date(data.Date);
                    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    results.push({ 'date': formatted_date, 'val': val / divid, 'merchant': data.Name, 'note': data.Description });
                }
            })

            .on('end', () => {
                console.log(results);

                // [
                //   { NAME: 'Daffy Duck', AGE: '24' },
                //   { NAME: 'Bugs Bunny', AGE: '22' }
                // ]
            });
        /*
                var fileContents = fs.readFileSync(filename).toString();
                csv(fileContents, {trim: true, skip_empty_lines: true})
        // Use the readable stream api
        .on('data', function(){
          let record
          while (record = this.read()) {
              console.log("** "+record);
            results.push(record)
          }
        })
        */
        /*        
                console.log(csv(fileContents));
                var lines = fileContents.toString().split('\r\n');
        
                for (var i = 1; i < lines.length; i++) {
                    let ele = lines[i].toString().split(',');
                    if (ele.length >= 5 && ele[0].length > 0) {
                        console.log(ele);
                        let val;
                        if (ele[4].length == 0) {
                            // Income
                            val = parseFloat(this.convertToFloat(ele[3]));
                        } else {
                            val = -parseFloat(this.convertToFloat(ele[4]));
                        }
                        const date = new Date(ele[0]);
                        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        results.push({ 'date': formatted_date, 'val': val, 'merchant': ele[1], 'note': ele[2] });
                    }
                }
                */
        //        return results;
        return results;
    };

}

module.exports = Util;