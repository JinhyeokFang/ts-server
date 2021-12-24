import bcrypt from 'bcrypt';
import { Encryption } from '../../application/interfaces/encryption.interface';

class Bcrypt implements Encryption {
  private saltRounds = 10;

  public async compare(password: string, encryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }

  public async createKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err, salt) => {
        if (err) reject(err);
        else resolve(salt);
      });
    });
  }

  public async hash(value: string): Promise<string> {
    const saltKey = await this.createKey();
    return new Promise((resolve, reject) => {
      bcrypt.hash(value, saltKey, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  }
}

export default new Bcrypt();
