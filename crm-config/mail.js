var response = require("http/v4/response");
var config = require("core/v4/configurations");

var mailUser = null;
var mailPassword = null;
var mailRecipient = null;

if (mailUser && mailPassword && mailRecipient) {
    config.set("MAIL_USER", mailUser);
    config.set("MAIL_PASSWORD", mailPassword),
    config.set("MAIL_RECIPIENT", mailRecipient);
    response.println("CRM - Mail Config - Successfully Setup");
} else {
    response.println("CRM - Mail Config - Missing Setup");
}
