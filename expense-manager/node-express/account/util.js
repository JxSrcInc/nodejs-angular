class Util {
    static convertToFloat(val) {
        if(val.substring(0,1) == "$") {
            val = val.substring(1);
        }
        val = val.replace(",","");
        return val;
    }
}

module.exports = Util;