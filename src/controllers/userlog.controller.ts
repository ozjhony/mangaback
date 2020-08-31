import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {NotificationKeys} from '../keys/notification-keys';
import {SmsNotification} from '../models';
import {EmailNotification} from '../models/email-notification.model';
import {UsuarioRepository} from '../repositories';
import {UserlogRepository} from '../repositories/userlog.repository';
import {AuthService} from '../service/auth.services';
import {NotificationService} from '../service/notification.service';
const jwt = require("jsonwebtoken");

class Credentials {
  username: string;
  password: string;
}

class PasswordResetData {
  username: string;
  type: number;
}

class ChangePasswordData {
  id: string;
  currentPassword: string;
  newPassword: string;
}



export class userlogControler {

  authService: AuthService;

  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {
    this.authService = new AuthService(this.userlogRepository);
  }


  @post('/login', {
    responses: {
      '200': {
        description: 'login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let user = await this.authService.Identify(credentials.username, credentials.password);
    if (user) {
      let tk = await this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }



  @post('/password-reset', {
    responses: {
      '200': {
        description: 'login for users'
      }
    }
  })
  async reset(
    @requestBody() data: PasswordResetData
  ): Promise<boolean> {
    let newPass = await this.authService.ResetPassword(data.username);
    let usuario = await this.usuarioRepository.findOne({where: {celular: data.username}});
    if (newPass) {
      switch (data.type) {
        // sms
        case 1:
          let smsNotification: SmsNotification = new SmsNotification({
            body: `${NotificationKeys.resetPasswordBody} ${newPass}`,
            to: usuario?.celular
          });
          let sms = await new NotificationService().SmsNotification(smsNotification);
          if (sms) {
            return true;
          }
          throw new HttpErrors[400]("Error sending sms message.");
          break;
        case 2:
          let emailNotification: EmailNotification = new EmailNotification({
            subject: NotificationKeys.subjectReset,
            textBody: `${NotificationKeys.resetPasswordBody} ${newPass}`,
            htmlBody: `${NotificationKeys.resetPasswordBody} ${newPass}`,
            to: usuario?.email
          });
          let email = await new NotificationService().EmailNotification(emailNotification);
          if (email) {
            return true;
          }
          throw new HttpErrors[400]("Error sending email message.");
          break;

        default:
          throw new HttpErrors[400]("This type of communication is not valid.");
          break;
      }
    }
    throw new HttpErrors[401]("User not found");

  }



  @post('/change-password', {
    responses: {
      '200': {
        description: 'Login for user',
      },
    },
  })
  async changePassword(
    @requestBody() data: ChangePasswordData): Promise<boolean> {
    let user = await this.authService.VerifyUserToChangePassword(data.id, data.currentPassword);
    if (user) {
      return await this.authService.ChangePassword(user, data.newPassword);
    } else {
      throw new HttpErrors[401]("User or Password invalid");
    }
  }





}
