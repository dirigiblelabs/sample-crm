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
    - https://www.dirigible.io -> `Try it Out`
1. Clone the `Sample CRM` repository into your Dirigible instance:
    - Switch to the `Git` perspective
    - Click on the `+` button to clone Git repository
    - Set the `URL` to https://github.com/dirigiblelabs/sample-crm.git
    - Click the `Clone` button

    ![sample-crm-git-clone](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/1-sample-crm-git-clone.gif)

1. Extend the `Entity Data Model` (model.edm) file:
    - Switch to the `Workbench` perspective
    - Expand the `crm` project
    - Open the `model.edm` file
    - Drag & Drop new field to the `Account` entity
    - Rename the new field to `HomePage`
    - Right click on the `HomePage` field and click `Properties`
    - Go to the `Data` tab and change the `Length` property to `64`
    - Go to the `User Interface` tab and set the `Widget Type` to `URL` and change the `Length` property to `64`
    - Exit the `Properties` page
    - Save the model

    ![sample-crm-add-field](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/2-sample-crm-add-field.gif)

1. Re-generate the application:
    - Right click on the `model.model` file
    - Click on the `Generate` option
    - Enter the following properties:
        - Extension: `crm`
        - Embedded: `true`
        - Title: `CRM`
        - Brand: `CRM`

    ![sample-crm-generate-application](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/3-sample-crm-generate-application.gif)

1. Add sample data:
    - Expand the `crm` project and select the `index.html` file
    - From the `Preview` view copy the application URL and open it in separate tab
    - Open the `Account` entity
    - Edit some of the account entries and enter the `HomePage` field

    ![sample-crm-add-home-page](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/4-sample-crm-add-home-page.gif)

## Tips & Tricks

In some cases, when updating the Entity Domain Model (model.edm), incompatible changes may occur. To resolve these issues, here are some Tips & Tricks about it:

1. Delete the generated files:
   - Delete all files under the "crm" project except `model.edm`, `model.model` and `project.json`
1. Unpublish the `crm` project
1. Re-generated the application from the updated `model.model`
1. Publish the `crm` project

In most cases, the previous steps should be enough to resolve issues from an incompatible change in the model. However, if incompatible change in the `Data` layer is made (e.g. `Null` -> `Not Null`, `VARCHAR` -> `INTEGER`, ...) then one addition step should be executed first:

1. Go to the `Database` perspective
1. Find the database table(s), to which incompatible changes were made
1. Right click on it
1. Select `Drop Table` from the menu

Otherwise execute SQL queries, to drop the table(s), from the `SQL` view:

```sql
drop table STUDENTS
```

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 2.0](https://www.eclipse.org/legal/epl-v20.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
