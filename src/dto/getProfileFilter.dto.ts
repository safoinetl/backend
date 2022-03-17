import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetProfileFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
