class Util {
    static convertToFloat(val) {
        return val.substring(1).replace(",", "");
    }
}

module.exports = Util;