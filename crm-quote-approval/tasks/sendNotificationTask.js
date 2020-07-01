var mail = require("mail/v4/client");
var config = require("core/v4/configurations");
var process = require("bpm/v4/process");

console.log(">>> Sending Notification");
var execution = process.getExecutionContext();
var approveAmount = process.getVariable(execution.getId(), "amount");

var mailUser = config.get("MAIL_USER");
var mailPassword = config.get("MAIL_PASSWORD");
var mailRecipient = config.get("MAIL_RECIPIENT");
var mailProtocol = config.get("MAIL_PROTOCOL", "smtps");
var mailHost = config.get("MAIL_HOST", "smtp.gmail.com");
var mailPort = config.get("MAIL_PORT", "465");
var mailAuth = config.get("MAIL_AUTH", "true");

var mailConfig = {
	"mail.user": mailUser,
	"mail.password": mailPassword,
	"mail.transport.protocol": mailProtocol,
	"mail.smtps.host": mailHost,
	"mail.smtps.port": mailPort,
	"mail.smtps.auth": mailAuth
};

var mailClient = mail.getClient(mailConfig);

var from = mailUser;
var recipients = {
	to: mailRecipient
};

var subject = "CRM - Approve Quote";
var content = "<h1>Approve Quote</h1><hr><p>Amount" + approveAmount + "</p><br><button>Approve</button>";
var subType = "html";

mailClient.send(from, recipients, subject, content, subType);

console.log(">>> Notification Mail Sent");