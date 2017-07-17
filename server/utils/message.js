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

var generateLocation = (from, lat, lng) =>{
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage,
    generateLocation
};
