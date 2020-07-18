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

## Extend

1. Setup Dirigible instance or use the trial one
    - https://www.dirigible.io/help/setup.html
    - https://www.dirigible.io -> "Try it Out"
1. Clone the "Sample CRM" repository into your Dirigible instance:
    ![sample-crm-git-clone](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/1-sample-crm-git-clone.gif)

1. Extend the "Entity Data Model" (model.edm) file:
    ![sample-crm-add-field](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/2-sample-crm-add-field.gif)

1. Re-generate the application:
    ![sample-crm-generate-application](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/3-sample-crm-generate-application.gif)

1. Add sample data:
    ![sample-crm-add-home-page](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/4-sample-crm-add-home-page.gif)

## Tips & Tricks

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 2.0](https://www.eclipse.org/legal/epl-v20.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
