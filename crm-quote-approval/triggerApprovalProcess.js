var process = require("bpm/v4/process")
var quoteDao = require("crm/data/dao/Entities/Quote");

exports.onMessage = function (message) {
    var quote = quoteDao.get(JSON.parse(message).key.value);
    process.start("quote-approval", {
        entity: JSON.stringify(quote)
    })
};

exports.onError = function (error) {
    console.error("Error from My Listener! Error: " + error);
};
