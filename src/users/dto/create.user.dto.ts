import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
