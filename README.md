# Sample - CRM

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/sample-crm.svg)](https://github.com/dirigiblelabs/sample-crm/graphs/contributors)

## Overview

Sample CRM Application

## Setup

Required environment/configuration variables:

|      Name      |     Description       | Default Value  |
|----------------|-----------------------|----------------|
| MAIL_USER      | The mailbox user      |       -        |
| MAIL_PASSWORD  | The mailbox password  |       -        |
| MAIL_RECIPIENT | The mail recipient    |       -        |
| MAIL_PROTOCOL  | The mailbox protocol  |     smtps      |
| MAIL_HOST      | The mailbox host      | smtp.gmail.com |
| MAIL_PORT      | The mailbox port      |      465       |
| MAIL_AUTH      | The mailbox auth      |      true      |


Programatic setup:
```javascript
var config = require("core/v4/configurations");

config.set("MAIL_USER", "<the-mail-user>");
config.set("MAIL_PASSWORD", "<the-mail-password>");
config.set("MAIL_RECIPIENT", "<the-mail-recipeint>");
// config.set("MAIL_PROTOCOL", "smtps");
// config.set("MAIL_HOST", "smtp.gmail.com");
// config.set("MAIL_PORT", "465");
// config.set("MAIL_AUTH", "true");
```

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 2.0](https://www.eclipse.org/legal/epl-v20.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
