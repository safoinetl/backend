import { IsString, IsEmail } from 'class-validator';
export class signInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
