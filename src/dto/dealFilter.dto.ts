import { IsOptional } from 'class-validator';
import { category } from 'src/enum/category-enum';

export class getDealsfiltersDto {
  @IsOptional()
  search?: string;
  @IsOptional()
  category?: category;
}
