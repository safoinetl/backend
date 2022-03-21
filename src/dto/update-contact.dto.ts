import { IsEmail, IsOptional } from 'class-validator';
import { address } from './fields/fields';

export class UpdateContactDto {
  //diviser le car ya des blocks
  @IsEmail()
  email: string;
  @IsOptional()
  address: address;
  @IsOptional()
  phone: number;
}
