import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  role?: string;
}
