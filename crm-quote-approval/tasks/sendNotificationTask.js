var mail = require("mail/v4/client");
var config = require("core/v4/configurations");
var process = require("bpm/v4/process");
var templateEngines = require("platform/v4/template-engines");
var accountDao = require("crm/data/dao/Customers/Account");
var productDao = require("crm/data/dao/Products/Product");

console.log(">>> Sending Notification");
var execution = process.getExecutionContext();
var approveAmount = process.getVariable(execution.getId(), "amount");
var quote = JSON.parse(process.getVariable(execution.getId(), "quote"));

var mailUser = config.get("MAIL_USER");
var mailRecipient = config.get("MAIL_RECIPIENT");

var mailConfig = {
	"mail.user": mailUser,
	"mail.password": config.get("MAIL_PASSWORD"),
	"mail.transport.protocol": config.get("MAIL_PROTOCOL", "smtps"),
	"mail.smtps.host": config.get("MAIL_HOST", "smtp.gmail.com"),
	"mail.smtps.port": config.get("MAIL_PORT", "465"),
	"mail.smtps.auth": config.get("MAIL_AUTH", "true")
};

var mailClient = mail.getClient(mailConfig);

var from = mailUser;
var recipients = {
	to: mailRecipient
};

var mailParameters = {
	approveAmount: approveAmount,
	quoteAccount: accountDao.get(quote.Account).Name,
	quoteDiscount: quote.Discount,
	quoteProduct: productDao.get(quote.Product).Name
};

var subject = "CRM - Approve Quote";
var mailBody = templateEngines.generateFromFile("crm-quote-approval/mail.html", mailParameters);
var subType = "html";

mailClient.send(from, recipients, subject, mailBody, subType);

console.log(">>> Notification Mail Sent");