import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { gender } from 'src/enum/gender-enum';
import { role } from 'src/enum/Role-Enum';
import { address, education, links, professional } from './fields/fields';

export class UpdateProfileDto {//diviser le car ya des blocks 
  // @IsOptional()
  // education: education;
  // @IsOptional()
  // professional: professional;
  @IsOptional()
  pseudo: string;
  // @IsOptional()
  // status: string;
  @IsOptional()
  birthDate: Date;
  @IsOptional()
  gender: gender;
  @IsOptional()
  address: address;
  @IsOptional()
  links: links;
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsPhoneNumber()
  phone: number;
  @IsOptional()
  interests?: [];
  @IsOptional()
  specialities?: [];
  @IsOptional()
  ProfilePicture: string;
  @IsString()
  role: role;
  @IsOptional()
  short_bio?: string;
  @IsOptional()
  long_bio?: string;
}
