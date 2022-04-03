import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @IsNotEmpty()
  password: string;
}
