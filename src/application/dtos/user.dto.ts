import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDTO {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    name: string = '기본값';
}

export class LoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}