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
import { CustomMatchPasswords } from '../validation-password';
export class AuthCredentialsDto {
  // @IsString()
  // user_id: string;
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
  @MinLength(8)
  @MaxLength(32)
  @Matches('password')
  @Validate(CustomMatchPasswords, ['password'])
  passwordconfirm: string;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsPhoneNumber()
  phone: number;
  @IsString()
  interests: [];
  @IsString()
  specialities: [];
  @IsString()
  ProfilePicture: string;
  @IsString()
  Role: role;
  @IsOptional()
  Brand_Name?: string;
  @IsOptional()
  M_F?: string;
  @IsOptional()
  short_bio?: string;
  @IsOptional()
  long_bio?: string;
}
