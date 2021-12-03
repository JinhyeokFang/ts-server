import { validate, ValidationError } from "class-validator";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from "ts-response";
import { User } from "../../domain/user.entity";
import bcrypt from "../../infrastructure/encryption/bcrypt";
import typeorm from "../../infrastructure/orm/typeorm";
import { LoginDTO, RegisterDTO } from "../dtos/user.dto";

class UserService {
    async register(registerDTO: RegisterDTO): Promise<void> {
        const isValidate = await validate(registerDTO);
        if (!isValidate)
            throw new ValidationError();

        const connection = await typeorm.getConnection();
        const repository = connection.getRepository(User);
        const user = await repository.findOne({ select: ["email"], where: { email: registerDTO.email } });
    
        if (user !== undefined)
            throw new ConflictError("이미 존재하는 계정입니다.");
    
        const userEntity = new User();
        userEntity.email = registerDTO.email;
        userEntity.password = await bcrypt.hash(registerDTO.password);
    
        await repository.save(userEntity);
    }

    async login(loginDTO: LoginDTO): Promise<void> {
        const isValidate = await validate(loginDTO);
        if (!isValidate)
            throw new ValidationError();

        const connection = await typeorm.getConnection();
        const repository = connection.getRepository(User);
        const user = await repository.findOne({ select: ["email", "password"], where: loginDTO });

        if (user === undefined || await bcrypt.compare(loginDTO.password, user.password) === false)
            throw new NotFoundError('유저를 찾을 수 없습니다.');
    }
}

export default new UserService();
