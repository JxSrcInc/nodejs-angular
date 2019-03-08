const csv = require('csv-parser')
const fs = require('fs')

class Loader {
    load(fileTransfer) {
        const results = [];
        const filename = fileTransfer.getFilename();
        return new Promise(function (resolve, reject) {
            if(!fs.existsSync(filename)) {
                // must handle it in separately.
                // because reject() does not stop the next statement if there is one
                // it does not return operation !!!
                reject({'err':'invalid file: '+filename});
            } else {
                fs.createReadStream(filename)
                .pipe(csv({trim:true,skip_empty_lines: true}))
                .on('data', (data) => {
                    const record = fileTransfer.convert(data);
                    if (record) {
                        results.push(record);
                    }
                })
                .on('error', (err) => {
                    reject(err)
                })
                .on('end', () => {
                    resolve(results);
                });
            }
        })
    };

}

module.exports = Loader;