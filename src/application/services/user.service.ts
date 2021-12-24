import { validate, ValidationError } from 'class-validator';
import {
  ConflictError, NotFoundError,
} from 'ts-response';
import User from '../../domain/user.entity';
import typeorm from '../../infrastructure/orm/typeorm';
import { LoginDTO, RegisterDTO } from '../dtos/user.dto';
import { Encryption } from '../interfaces/encryption.interface';

export default class UserService {
  private encryption: Encryption;

  constructor(encryption: Encryption) {
    this.encryption = encryption;
  }

  async register(registerDTO: RegisterDTO): Promise<void> {
    const isValidate = await validate(registerDTO);
    if (!isValidate) throw new ValidationError();

    const connection = await typeorm.getConnection();
    const repository = connection.getRepository(User);
    const user = await repository.findOne({ select: ['email'], where: { email: registerDTO.email } });

    if (user !== undefined) throw new ConflictError('이미 존재하는 계정입니다.');

    const userEntity = new User();
    userEntity.email = registerDTO.email;
    userEntity.password = await this.encryption.hash(registerDTO.password);

    await repository.save(userEntity);
  }

  async login(loginDTO: LoginDTO): Promise<void> {
    const isValidate = await validate(loginDTO);
    if (!isValidate) throw new ValidationError();

    const connection = await typeorm.getConnection();
    const repository = connection.getRepository(User);
    const user = await repository.findOne({ select: ['email', 'password'], where: { email: loginDTO.email } });

    if (user === undefined) throw new NotFoundError('유저를 찾을 수 없습니다.');
    if (await this.encryption.compare(loginDTO.password, user.password) === false) throw new NotFoundError('유저를 찾을 수 없습니다.');
  }
}
