# Sample - CRM

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/sample-crm.svg)](https://github.com/dirigiblelabs/sample-crm/graphs/contributors)
[![Run on Dirigible](https://img.shields.io/badge/run%20on-dirigible-blue.svg)](http://trial.dirigible.io/services/v4/web/ide-deploy-manager/?repository=https://github.com/dirigiblelabs/sample-crm.git&uri=/services/v4/web/ide/)

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

1. Setup Dirigible instance or use the trial one
    - https://www.dirigible.io/help/setup.html
    - https://www.dirigible.io -> `Try it Out`
    - or click on the ![Run on Dirigible](https://img.shields.io/badge/run%20on-dirigible-blue.svg) button
1. Clone the `Sample CRM` repository into your Dirigible instance:
    - Switch to the `Git` perspective
    - Click on the `+` button to clone Git repository
    - Set the `URL` to https://github.com/dirigiblelabs/sample-crm.git
    - Click the `Clone` button

    ![sample-crm-git-clone](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/1-sample-crm-git-clone.gif)

1. Setup a mail configuration:
    - Expand the `crm-config` project
    - Open `mail.js`
    - Replace the following snippet with your values:
        ```javascript
        var mailUser = "<your-mail-user>";
        var mailPassword = "<your-mail-password>";
        var mailRecipient = "<the-mail-recipient>";
        ```

        ![sample-crm-mail-config](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/8-sample-crm-mail-config.gif)

        > TIP: Since Google’s Gmail SMTP server is being used, you’ll have to make some adjustment to your Google security settings. You’ll have to turn on the “Less secure app access” so that this e-mail can go through to your inbox:

        ![google_security_settings_border](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/google_security_settings_border.png)

        > The first time, when mail is sent, a notification for "3rd party usage" in your Gmail mailbox will be sent, that needs to be confirmed.

## Extend

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

## BPM Process

1. Overview:
    - Expand the `crm-quote-approval` and open the `quote-approval.bpmn` file
    - The process contains three steps and one flow condition:
      - `StartProcessTask` - initial task to set the execution context
      - `SendNotificationTask` - depending on the flow condition, the task is triggered when the `Quote -> Amount` is greaterr than `10` and mail notification is sent
      - `AutoApproveTask` - auto approval of the created `Quote` if the `Amount` is less than `10`

    ![sample-crm-process-overview](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/10-sample-crm-process-overview.gif)

1. Trigger the `Quote Approval` process:
    - Navigate to the `Sales` section and select the `Quote` tile
    - Select the `Quote` tab, if needed
    - Create new `Quote` with `Ammount` greater than `10`

    ![sample-crm-create-quote](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/9-sample-crm-create-quote.gif)

    > After few seconds, "Quote Approval" mail should be recieved:

    ![mail-recieved](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/mail-recieved.png)

1. Update the mail message template:
    - Expand the `crm-quote-approval` project and open the `mail.html` file
    - Replace the file content with this one:
    ```html
        <!DOCTYPE html>

        <head>
        </head>

        <body>
            <h1>[Approve Quote] ${quoteAccount} - ${quoteProduct}</h1>
            <hr>
            <p>
                <b>Account</b>: <i>${quoteAccount}</i>
            </p>
            <p>
                <b>Product</b>: <i>${quoteProduct}</i>
            </p>
            <p>
                <b>Discount</b>: <i>${quoteDiscount}</i>
            </p>
            <p>
                <b>Quote Amount</b>: <i>${approveAmount}</i>
            </p>
            <br>
            <a href="https://www.dirigible.io">Approve</a>
        </body>

        </html>
    ```
    - Create new `Quote` with `Amount` less than `10` to trigger the notification process with the updated mail template

1. Update process:
    - Other changes to `quote-approval.bpm` can be made, such as:
      - Update the flow condition (e.g. change it to greater than `100`)
      - Add new step(s)
      - Add new flow condition(s)
    - To apply the updated process follow these steps:
      - Click on the `Save` icon
      - Right click on the `crm-quote-approval` project and select `Publish` from the menu
      - Wait around `30 sec.` before triggering the updated process
    - Open the `Create Quote` listener:
      - open the `quote-create.listener` file
      - when `crm/Sales/Quote/Create` event is created, then the `crm-quote-approval/triggerApprovalProcess.js` handler will be triggered
      - open the `triggerApprovalProcess.js` file to see how the `quote-approval` process is being started

## Tips & Tricks

In some cases, when updating the Entity Domain Model (model.edm), incompatible changes may occur. To resolve these issues, here are some Tips & Tricks about it:

1. Delete the generated files:
   - Delete all files under the "crm" project except `model.edm`, `model.model` and `project.json`
1. Unpublish the `crm` project
1. Re-generated the application from the updated `model.model`
1. Publish the `crm` project

![sample-crm-tips-and-tricks-1](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/5-sample-crm-tips-and-tricks-1.gif)

In most cases, the previous steps should be enough to resolve issues from an incompatible change in the model. However, if incompatible change in the `Data` layer is made (e.g. `Null` -> `Not Null`, `VARCHAR` -> `INTEGER`, ...) then one addition step should be executed first:

1. Go to the `Database` perspective
1. Find the database table(s), to which incompatible changes were made
1. Right click on it
1. Select `Drop Table` from the menu

Otherwise execute SQL queries, to drop the table(s), from the `SQL` view:

```sql
drop table STUDENTS
```

![sample-crm-tips-and-tricks-2](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/6-sample-crm-tips-and-tricks-2.gif)

In some cases the generated application view(s) may disappear or be closed by accident. To reset the default layout follow these steps:

1. Click on the "Themese" menu
1. Select the "Reset" option

![sample-crm-tips-and-tricks-3](https://github.com/dirigiblelabs/sample-crm/blob/master/docs/7-sample-crm-tips-and-tricks-3.gif)

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 2.0](https://www.eclipse.org/legal/epl-v20.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
