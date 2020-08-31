import {notificationDatasource} from '../datasources/notification.datasource';
import {SmsNotification} from '../models';
import {EmailNotification} from '../models/email-notification.model';
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
export class NotificationService {

  async SmsNotification(notification: SmsNotification): Promise<boolean> {
    try {
      const accountSid = notificationDatasource.TWILIO_SID;
      const authToken = notificationDatasource.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);

      await client.messages
        .create({
          body: notification.body,
          from: notificationDatasource.TWILIO_FROM,
          to: notification.to
        })
        .then((message: any) => {
          console.log(message)
        });
      return true;
    } catch (error) {
      return false;
    }
  }

  async EmailNotification(notification: EmailNotification): Promise<boolean> {
    try {
      sgMail.setApiKey(notificationDatasource.SENDGRID_API_KEY);
      const msg = {
        to: notification.to,
        from: notificationDatasource.SENDGRID_FROM,
        subject: notification.subject,
        text: notification.textBody,
        html: notification.htmlBody,
      };
      await sgMail.send(msg).then((data: any) => {
        console.log(data);
        return true;
      }, function (error: any) {
        console.log(error);
        return false;
      });
      return true;
    }
    catch (err) {
      return false;
    }
  }
}
