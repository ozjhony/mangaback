import {repository} from '@loopback/repository';
import {generate as passGenerator} from 'generate-password';
import {PasswordKeys as passKeys} from '../keys/password-keys';
import {serviceKeys as keys} from '../keys/service-keys';
import {Userlog} from '../models';
import {UserlogRepository} from '../repositories';
import {EncryptDecrypt} from './encryptdescrypt.service';
const jwt = require("jsonwebtoken");

export class AuthService {
  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository
  ) {

  }

  /**
     *
     * @param username
     * @param password
     */
  async Identify(username: string, password: string): Promise<Userlog | false> {
    let user = await this.userlogRepository.findOne({where: {username: username}});
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(password);
      if (user.password == cryptPass) {
        return user;
      }
    }
    return false;

  }

  /**
    *
    * @param user
    */
  async GenerateToken(user: Userlog) {
    user.password = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: user.id,
        username: user.username,
        role: user.role,
        paternId: user.usuarioId
      }
    },
      keys.JWT_SECRET_KEY);
    return token;
  }

  async verifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY);
      return data;
    }
    catch (error) {
      return false;
    }
  }


  async ResetPassword(username: string): Promise<string | false> {
    let user = await this.userlogRepository.findOne({where: {username: username}});
    if (user) {
      let randomPassword = await this.GenerateRandomPassword();
      let encrypter = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD);
      let encryptPass = encrypter.Encrypt(encrypter.Encrypt(randomPassword));
      user.password = encryptPass;
      this.userlogRepository.replaceById(user.id, user);
      return randomPassword;
    }
    return false;
  }

  async GenerateRandomPassword() {
    let randomPassword = passGenerator({
      length: passKeys.LENGTH,
      numbers: passKeys.NUMBERS,
      uppercase: passKeys.UPPERCASE,
      lowercase: passKeys.LOWERCASE
    });
    return randomPassword;
  }

  async VerifyUserToChangePassword(id: string, currentPassword: string): Promise<Userlog | false> {
    let user = await this.userlogRepository.findById(id);
    if (user) {
      let encryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(currentPassword);
      if (user.password == encryptPass) {
        return user;
      }
    }
    return false;
  }

  async ChangePassword(user: Userlog, newPassword: string): Promise<boolean> {
    try {
      let encryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(newPassword);
      user.password = encryptPass;
      await this.userlogRepository.updateById(user.id, user);
      return true;
    } catch (_) {
      return false;
    }
  }

}
