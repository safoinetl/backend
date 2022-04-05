import { IsString, IsEmail } from 'class-validator';
export class signInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
