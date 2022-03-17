import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
  Validate,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { role } from '../enum/Role-Enum';
export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is weak',
  })
  password: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsPhoneNumber()
  phone: number;
  @IsString()
  interests?: [];
  @IsString()
  specialities?: [];
  @IsOptional()
  ProfilePicture: string;
  @IsString()
  role: role;
  @IsOptional()
  Brand_Name?: string;
  @IsOptional()
  M_F?: string;
  @IsOptional()
  short_bio?: string;
  @IsOptional()
  long_bio?: string;
}
