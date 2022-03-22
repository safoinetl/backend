import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { gender } from 'src/enum/gender-enum';
import { role } from 'src/enum/Role-Enum';
import { address, education, links, professional } from './fields/fields';

export class UpdateProfileDto {
  @IsOptional()
  pseudo?: string;
  @IsOptional()
  birthDate: Date;
  @IsOptional()
  gender: gender;
  @IsOptional()
  name: string;
  @IsOptional()
  surname: string;
  @IsOptional()
  education: education;
  @IsOptional()
  professional: professional;
  @IsOptional()
  status: string;
  @IsOptional()
  address: address;
  @IsOptional()
  links: links;
  @IsOptional()
  phone: number;
  @IsOptional()
  interests?: [];
  @IsOptional()
  specialities?: [];
  @IsOptional()
  ProfilePicture: string;
  @IsOptional()
  short_bio?: string;
  @IsOptional()
  long_bio?: string;
  @IsOptional()
  email: string;
}
