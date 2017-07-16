/**
 * Created by lloughlin on 16/7/17.
 */

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage
};
