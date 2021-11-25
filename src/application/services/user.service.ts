import { validate, ValidationError } from "class-validator";
import { BadRequestError, InternalServerError, NotFoundError } from "ts-response";
import { User } from "../../domain/user.entity";
import bcrypt from "../../infrastructure/encryption/bcrypt";
import typeorm from "../../infrastructure/orm/typeorm";
import { LoginDTO, RegisterDTO } from "../dtos/user.dto";

class UserService {
    async register(registerDTO: RegisterDTO): Promise<void> {
        try {
            const isValidate = await validate(registerDTO);
            if (!isValidate)
                throw new ValidationError();

            const userEntity = new User();
            const connection = await typeorm.getConnection();
            const repository = connection.getRepository(User);
            userEntity.email = registerDTO.email;
            userEntity.password = await bcrypt.hash(registerDTO.password);
            userEntity.name = registerDTO.name;
            
            await repository.save(userEntity);
        } catch (error: unknown) {
            switch (error) {
                case ValidationError:
                    throw new BadRequestError('잘못된 형식의 요청입니다: ' + error);

                default:
                    throw new InternalServerError('서버 오류: ' + error);
            }
        }
    }

    async login(loginDTO: LoginDTO): Promise<void> {
        try {
            const isValidate = await validate(loginDTO);
            if (!isValidate)
                throw new ValidationError();

            const connection = await typeorm.getConnection();
            const repository = connection.getRepository(User);
            const user = await repository.findOne({ select: ["email", "password"], where: loginDTO });

            if (user === undefined)
                throw new NotFoundError('유저를 찾을 수 없습니다.');
        } catch (error: unknown) {
            switch (error) {
                case ValidationError:
                    throw new BadRequestError('잘못된 형식의 요청입니다: ' + error);

                default:
                    throw new InternalServerError('서버 오류: ' + error);
            }
        }
    }
}

export default new UserService();
