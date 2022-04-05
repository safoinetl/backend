import { IsOptional, IsString } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';

export class CreateDealDto {
  @IsString()
  title: string;
  @IsString()
  price: string;
  @IsString()
  deal_description: string;
  @IsString()
  images: string;
  @IsString()
  category: [category];
  @IsString()
  deal_type: dealType;
}
