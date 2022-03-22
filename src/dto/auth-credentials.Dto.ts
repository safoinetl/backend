import {
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { gender } from 'src/enum/gender-enum';
import { role } from '../enum/Role-Enum';
import { address, education, links, professional } from './fields/fields';
export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password is weak',
  // })
  password: string;
  @IsOptional()
  name: string;
  @IsOptional()
  surname: string;
  @IsString()
  phone: string;
  @IsOptional()
  interests?: [];
  @IsOptional()
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
  @IsOptional()
  education: education;
  @IsOptional()
  professional: professional;
  @IsOptional()
  pseudo: string;
  @IsOptional()
  status: string;
  @IsOptional()
  birthDate: Date;
  @IsOptional()
  gender: gender;
  @IsOptional()
  address: address;
  @IsOptional()
  links: links;
}
