/**
 * Created by lloughlin on 17/7/17.
 */
let isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {
    isRealString
};