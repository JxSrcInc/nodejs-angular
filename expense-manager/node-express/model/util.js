class Util {
    static load(filename) {
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
}

module.exports = Util;