import { IsOptional, IsString } from 'class-validator';
import { category } from 'src/enum/category-enum';
import { dealType } from 'src/enum/deals-type-enum';

export class CreateDealDto {
  @IsString()
  deal_name: string;
  @IsString()
  price: string;
  @IsOptional()
  description: string;
  @IsString()
  deal_picture: string;
  @IsString()
  category: [category];
  @IsString()
  deal_type: dealType;
}
